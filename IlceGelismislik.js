const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const IlceGelismislik = sequelize.define('IlceGelismislik', {
  gelismislik_kademe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  seviye: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'ilce_gelismislik'
});

module.exports = IlceGelismislik;
