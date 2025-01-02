const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Database bağlantısını yapılandırdığınız dosya

const SaglikBirimleri = sequelize.define('SaglikBirimleri', {
    ilce_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    huzurevi_sayisi: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hastane_sayisi: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'saglik_birimleri',
    timestamps: false,
});

module.exports = SaglikBirimleri;
