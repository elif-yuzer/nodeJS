"use strict";
/* -------------------------------------------------------
            EXPRESSJS - TODO MODEL
------------------------------------------------------- */

// MODELS:
const { Sequelize, DataTypes } = require("sequelize");

// sequelize instance olusturalim
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
// const sequelize = new Sequelize("postgres://USER:PASS@HOST:PORT/DBNAME");

// connection for render db
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }
);


// MODEL (Todo):
const Todo = sequelize.define("todos", {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: DataTypes.TEXT, // shorthand usage.

  priority: {
    // -1: Low, 0: normal, 1: high
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  //   newField: DataTypes.STRING

  // not needed define createdAt and updatedAt fields. Cause they are created by sequelize.
});

// Syncronization (runs only once):
// sequelize.sync() // CREATE TABLE
// sequelize.sync({force: true}) // DROP TABLE * CREATE TABLE
// sequelize.sync({alter: true}) // BACKUP & DROP TABLE * CREATE TABLE FROM BACKUP

// conntect to db:
sequelize
  .authenticate()
  .then(() => console.log("* DB CONNECTED *"))
  .catch((error) => console.log("! DB NOT CONNECTED !", error));

module.exports = Todo;
