const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Calisan = sequelize.define('Calisan', {
  calisan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // Explicit as IDs seem pre-defined
  },
  bayi_id: {
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
  pozisyon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  maas: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
  },
}, {
  tableName: 'calisanlar', // Matches your table name
  timestamps: false, // Disable createdAt and updatedAt columns
});

module.exports = Calisan;