const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BayiGecmis = sequelize.define('BayiGecmis', {
    kayit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bayi_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ay: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    ay_musteri_sayi: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    ay_kazanc: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'bayi_gecmis',
    timestamps: false
});

module.exports = BayiGecmis;
