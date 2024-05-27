// // bullmqWorker.js
// const { Worker, QueueEvents } = require('bullmq');
// const pdf = require('pdf-parse');
// const use = require('@tensorflow-models/universal-sentence-encoder');
// const { Project } = require('../models/db'); // Ensure the correct path
// const config = require('../config/config');
// const AWS = require('aws-sdk');
// const tf = require('@tensorflow/tfjs-node');

// console.log("Initializing worker...");

// // Initialize S3 client
// const s3 = new AWS.S3({
//   accessKeyId: config.s3.accessKeyId,
//   secretAccessKey: config.s3.secretAccessKey,
//   region: config.s3.region
// });

// // Function to get file buffer from S3
// const getFileFromS3 = async (fileUrl) => {
//   const urlParts = fileUrl.split('/');
//   const bucket = urlParts[2].split('.')[0];
//   const key = urlParts.slice(3).join('/');

//   const params = {
//     Bucket: bucket,
//     Key: key
//   };

//   const data = await s3.getObject(params).promise();
//   return data.Body;
// };

// // Create a queue worker
// const worker = new Worker('pdfProcessing', async job => {
//   console.log("Worker received a job:", job.id);
//   const { fileUrl, projectId } = job.data;

//   try {
//     // Get the PDF file from S3
//     console.log("Reading the PDF file from S3");
//     const buffer = await getFileFromS3(fileUrl);
//     console.log("File read from S3, Extracting text");

//     // Extract text from PDF
//     const data = await pdf(buffer);
//     const text = data.text;
//     console.log("Text extracted from PDF");

//     // Generate embeddings
//     console.log("Loading TensorFlow.js Node.js backend");
//     tf.setBackend('tensorflow'); // Set the backend to 'tensorflow'
//     await tf.ready(); // Ensure the backend is ready
//     console.log("TensorFlow.js Node.js backend loaded");

//     const model = await use.load();
//     console.log("Model loaded");
//     const embeddings = await model.embed([text]);
//     const embeddingArray = embeddings.arraySync()[0];
//     console.log("Embeddings generated");

//     // Update project in database with embeddings
//     const project = await Project.findByPk(projectId);
//     if (project) {
//       await project.update({ embeddings: embeddingArray });
//       console.log("Project updated with embeddings");
//     } else {
//       throw new Error("Project not found");
//     }

//     // Emit progress event
//     await job.updateProgress(100);
//     console.log(`Job ${job.id} completed`);
//   } catch (error) {
//     console.error('Error processing PDF:', error);
//     await job.moveToFailed({ message: error.message });
//   }
// }, {
//   connection: {
//     host: config.redis.host,
//     port: config.redis.port
//   }
// });

// worker.on('completed', (job) => {
//   console.log(`Job ${job.id} completed successfully`);
// });

// worker.on('failed', (job, err) => {
//   console.error(`Job ${job.id} failed with error: ${err.message}`);
// });

// worker.on('error', (err) => {
//   console.error('Worker encountered an error:', err);
// });

// const queueEvents = new QueueEvents('pdfProcessing');
// queueEvents.on('error', (error) => {
//   console.error('Queue error:', error);
// });

// queueEvents.on('progress', (jobId, progress) => {
//   console.log(`Job ${jobId} progress: ${progress}%`);
// });

// console.log("Worker initialized and listening for jobs...");
const { Worker, QueueEvents } = require('bullmq');
const pdf = require('pdf-parse');
const use = require('@tensorflow-models/universal-sentence-encoder');
const { Project } = require('../models/db'); // Ensure the correct path
const config = require('../config/config');
const AWS = require('aws-sdk');
const tf = require('@tensorflow/tfjs-node');

console.log("Initializing worker...");

// Initialize S3 client
const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region
});

// Function to get file buffer from S3
const getFileFromS3 = async (fileUrl) => {
  const urlParts = fileUrl.split('/');
  const bucket = urlParts[2].split('.')[0];
  const key = urlParts.slice(3).join('/');

  const params = {
    Bucket: bucket,
    Key: key
  };

  const data = await s3.getObject(params).promise();
  return data.Body;
};

// Create a queue worker
const worker = new Worker('pdfProcessing', async job => {
  console.log("Worker received a job:", job.id);
  const { fileUrl, projectId } = job.data;

  try {
    // Get the PDF file from S3
    console.log("Reading the PDF file from S3");
    const buffer = await getFileFromS3(fileUrl);
    console.log("File read from S3, Extracting text");

    // Extract text from PDF
    const data = await pdf(buffer);
    const text = data.text;
    console.log("Text extracted from PDF");

    // Generate embeddings
    console.log("Loading TensorFlow.js Node.js backend");
    tf.setBackend('tensorflow'); // Set the backend to 'tensorflow'
    await tf.ready(); // Ensure the backend is ready
    console.log("TensorFlow.js Node.js backend loaded");

    const model = await use.load();
    console.log("Model loaded");
    const embeddings = await model.embed([text]);
    const embeddingArray = embeddings.arraySync()[0];
    console.log("Embeddings generated");

    // Update project in database with embeddings
    const project = await Project.findByPk(projectId);
    if (project) {
      await project.update({ embeddings: embeddingArray, status: 'created' });
      console.log("Project updated with embeddings");
    } else {
      throw new Error("Project not found");
    }

    // Emit progress event
    await job.updateProgress(100);
    console.log(`Job ${job.id} completed`);
  } catch (error) {
    console.error('Error processing PDF:', error);
    const project = await Project.findByPk(job.data.projectId);
    if (project) {
      await project.update({ status: 'failed' });
    }
    await job.moveToFailed({ message: error.message });
  }
}, {
  connection: {
    host: config.redis.host,
    port: config.redis.port
  }
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});

worker.on('error', (err) => {
  console.error('Worker encountered an error:', err);
});

const queueEvents = new QueueEvents('pdfProcessing');
queueEvents.on('error', (error) => {
  console.error('Queue error:', error);
});

queueEvents.on('progress', (jobId, progress) => {
  console.log(`Job ${jobId} progress: ${progress}%`);
});

console.log("Worker initialized and listening for jobs...");
