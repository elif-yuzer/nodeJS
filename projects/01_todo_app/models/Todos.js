
const { Sequelize ,DataTypes} = require('sequelize');
require('dotenv').config();

//*Node.js'te modüler yapının (dosyaları bölmenin) en büyük sırrı budur: Bir fabrikada (db.js) canlı bir nesne üret, paketle (module.exports), diğer fabrikada (Todo.js) aynı isimle teslim al (require) ve kullan.
const sequelize=require('../config/db')

//*models: veritabanındakı todos un harıtası krokısı
//*modeller buyuk harfle baslar.

//*create a new table
const Todo = sequelize.define("todos", {
  /*  id: {
    type: Number.INTEGER,
    allowNull: false, //*defaultu true null olmasına ızın verıyor sequelize
    unique: true, //*defaultu false primary key için bu ikisine dikkat

    comment: "description",
    primaryKey: true, //*default false
    autoIncrement: true,
    field:'todo_id',  //*backendde gormsını ıstedıgmz formatı
    defaultValue:100 //*defaultu null
  }, */
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

  // not needed define createdAt and updatedAt fields. Cause they are created by sequelize.
});


console.log("model calıstımı");

  module.exports = Todo;