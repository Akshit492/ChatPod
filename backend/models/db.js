// const Sequelize = require('sequelize');
// const config = require('../config/config');

// const sequelize = new Sequelize(config.development);

// // Define your Project model
// const Project = sequelize.define('projects', {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false
//   },
//   fileurl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   embeddings: {
//     type: Sequelize.JSONB // Assuming embeddings will be stored as JSON
//   }
// });

// // Add other model definitions if needed

// module.exports = {
//   sequelize,
//   Project
// };
// models/db.js
const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const Project = sequelize.define('projects', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fileurl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  embeddings: {
    type: Sequelize.JSONB
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'creating' // Set default status to 'creating'
  }
});

module.exports = {
  sequelize,
  Project
};
