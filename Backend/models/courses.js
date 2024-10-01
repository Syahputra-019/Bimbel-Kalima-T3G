const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db.js');

// Definisikan model Course
const Courses = sequelize.define('Courses', {
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

module.exports = Courses;
