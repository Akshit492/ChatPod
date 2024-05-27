// const { Worker } = require('bullmq');
// const pdf = require('pdf-parse');
// const use = require('@tensorflow-models/universal-sentence-encoder');
// const { Project, sequelize } = require('../models/db');
// const config = require('../config/config');

// const worker = new Worker('pdfProcessing', async job => {
//   const { fileUrl, projectId } = job.data;

//   // Download the PDF file
//   const response = await fetch(fileUrl);
//   const buffer = await response.buffer();

//   // Extract text from PDF
//   const data = await pdf(buffer);
//   const text = data.text;

//   // Generate embeddings
//   const model = await use.load();
//   const embeddings = await model.embed([text]);
//   const embeddingArray = embeddings.arraySync()[0];

//   // Store embeddings in Postgres
//   await Project.update(
//     { embeddings: embeddingArray },
//     { where: { id: projectId } }
//   );
// }, {
//   connection: {
//     host: config.redis.host,
//     port: config.redis.port
//   }
// });

// module.exports = worker;
