const { Queue } = require('bullmq');
const config = require('../config/config');

let queue;

try {
  queue = new Queue('pdfProcessing', {
    connection: {
      host: config.redis.host,
      port: config.redis.port
    }
  });
  console.log("Connection to Redis established");
} catch (error) {
  console.error('Error initializing BullMQ queue:', error);
}

module.exports = queue;
