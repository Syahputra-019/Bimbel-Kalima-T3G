const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Definisikan model Course
const Course = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
});

module.exports = Course;
