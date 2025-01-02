const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // İsteğe bağlı olarak SQL çıktısını devre dışı bırakabilirsiniz
  }
);

module.exports = sequelize;
