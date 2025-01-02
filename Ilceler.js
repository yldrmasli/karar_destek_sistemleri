const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Database bağlantısını yapılandırdığınız dosya

const Ilce = sequelize.define('Ilce', {
    ilce_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ilce_isim: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nufus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    yasli_nufus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    yasli_orani: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gelismislik_kademe: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gelismislik_skor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'ilceler',
    timestamps: false,
});

module.exports = Ilce;
