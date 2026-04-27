const { Sequelize ,DataTypes} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { rejectUnauthorized: false }  
    }

  }
);


//*models
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

//*senkronize işlemi sadece bır kere calısıyor
sequelize.sync()

sequelize
  .authenticate()
  .then(() => console.log("DB Bağlantı hazır "))
  .catch((err) => console.log("Hata:", err.message));

  module.exports = sequelize;