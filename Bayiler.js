const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bayiler = sequelize.define('Bayiler', {
  bayi_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bayi_isim: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ilce_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'bayiler'
});

module.exports = Bayiler;
