
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { Project } = require('../models/db');
const config = require('../config/config');
const router = express.Router();
const { Queue, QueueEvents } = require('bullmq');

// Initialize S3 client
const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region
});

const upload = multer();
const queue = new Queue('pdfProcessing', {
  connection: {
    host: config.redis.host,
    port: config.redis.port
  }
});

// Initialize QueueEvents to listen for job events
const queueEvents = new QueueEvents('pdfProcessing', {
  connection: {
    host: config.redis.host,
    port: config.redis.port
  }
});

queueEvents.on('completed', async ({ jobId }) => {
  console.log(`Job ${jobId} has been completed.`);
  const job = await queue.getJob(jobId);
  if (job) {
    const { projectId } = job.data;
    console.log(`Project ${projectId} processing completed.`);
    await Project.update({ status: 'created' }, { where: { id: projectId } });
  }
});

queueEvents.on('failed', async ({ jobId, failedReason }) => {
  console.log(`Job ${jobId} has failed with reason: ${failedReason}`);
  const job = await queue.getJob(jobId);
  if (job) {
    const { projectId } = job.data;
    console.log(`Project ${projectId} processing failed.`);
    await Project.update({ status: 'failed' }, { where: { id: projectId } });
  }
});

router.post('/projects', upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send({ error: 'File is required' });
  }

  const params = {
    Bucket: config.s3.bucket,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  try {
    // Upload file to S3
    const data = await s3.upload(params).promise();
    console.log('File uploaded to S3:', data.Location);

    // Create project in database with status 'creating'
    const project = await Project.create({
      title,
      description,
      fileurl: data.Location,
      status: 'creating'
    });
    console.log('Project created:', project.id);

    // Add job to BullMQ for further processing
    console.log('Adding job to queue');
    await queue.add('pdfProcessing', {
      fileUrl: data.Location,
      projectId: project.id
    });
    console.log('Job added to queue for processing');

    // Send successful response
    res.status(200).send(project);
  } catch (error) {
    console.error('Error uploading file or processing project:', error);
    res.status(500).send({ error: 'Error uploading file or processing project', detailedError: error.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).send(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send({ error: 'Error fetching projects', detailedError: error.message });
  }
});

module.exports = router;
