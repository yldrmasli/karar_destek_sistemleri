const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pozisyonlar = sequelize.define('Pozisyonlar', {
  pozisyon_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  pozisyon_ad: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'pozisyonlar'
});

module.exports = Pozisyonlar;
