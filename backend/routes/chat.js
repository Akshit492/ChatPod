const express = require('express');
const router = express.Router();
const { Project } = require('../models/db');
const { Op } = require('sequelize');
const Replicate = require('replicate');
const config = require('../config/config');
const axios = require('axios');

const REPLICATE_API_KEY = config.openapi.REPLICATE_API_KEY;

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

if (!REPLICATE_API_KEY) {
  console.error('Replicate API key is not set.');
  process.exit(1);
}

// Function to convert a message to a vector using the Python server
async function convertToVector(text) {
  try {
    const response = await axios.post('http://127.0.0.1:5001/vectorize', {
      words: text.split(' ')
    });
    const vectors = response.data.vectors;
    // Check if the vector is all zeros
    const isAllZeros = vectors[0].every(val => val === 0);
    return isAllZeros ? null : vectors;
  } catch (error) {
    console.error('Error converting text to vector:', error);
    return null;
  }
}

// Function to fetch relevant vectors from PostgreSQL
async function fetchRelevantVectors(projectId, userMessageVector) {
  const relevantVectors = await Project.findAll({
    where: {
      id: projectId,
      embeddings: {
        [Op.contains]: [userMessageVector]
      }
    }
  });
  return relevantVectors;
}

// Calculate the similarity between two vectors
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((acc, val, idx) => acc + val * vec2[idx], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

// Find the most relevant vectors based on cosine similarity
function findMostRelevantVectors(userMessageVector, relevantVectors, topN = 5) {
  return relevantVectors
    .map(vectorObj => ({
      ...vectorObj,
      similarity: cosineSimilarity(userMessageVector[0], vectorObj.dataValues.embeddings[0])
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
}

// Route to handle chat messages
router.post('/projects/:projectId/chat', async (req, res) => {
  try {
    const { projectId } = req.params;
    const userMessage = req.body.message;

    // Convert userMessage to a vector
    const userMessageVector = await convertToVector(userMessage);

    // If no valid vector was found, return a specific message
    if (!userMessageVector) {
      return res.status(200).json({ message: 'No valid information was found in this PDF for this query.' });
    }

    // Fetch relevant vectors from the database
    const relevantVectors = await fetchRelevantVectors(projectId, userMessageVector);

    // Find the most relevant vectors
    const mostRelevantVectors = findMostRelevantVectors(userMessageVector, relevantVectors);

    // Construct the input object for Replicate streaming
    const input = {
      top_p: 0.95,
      prompt: `Context: ${mostRelevantVectors.map(v => v.dataValues.description).join('\n')}\nUser: ${userMessage}\nBot:`,
      max_tokens: 150 // Adjust max tokens as needed
    };

    // Stream responses from Replicate API and accumulate them
    let responseText = '';
    for await (const event of replicate.stream("nousresearch/hermes-2-theta-llama-8b", { input })) {
      responseText += event.toString();
    }
    // Send the accumulated response
    res.status(200).json({ message: responseText });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send({ error: 'Error processing message' });
  }
});

module.exports = router;
