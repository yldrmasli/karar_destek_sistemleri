const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // IDs seem pre-defined
  },
  bayi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  ad: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  soyad: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isEmail: true, // Validates that this is a valid email
      },
  },
  sifre: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  tableName: 'user', // Matches the table name
  timestamps: false, // Disable createdAt and updatedAt
});

module.exports = User;