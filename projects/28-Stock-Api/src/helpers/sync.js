"use strict"
/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// sync():
const { users, brands, categories, firms, products, purchases, sales } = require('./dummyData')

module.exports = async function () {

    // return null;

    /* REMOVE DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */

    /* User */
    const User = require('../models/user')
    await User.deleteMany() // !!! Clear collection.
    await User.insertMany(users);

    /* Brand */
    const Brand = require('../models/brand')
    await Brand.deleteMany() // !!! Clear collection.
    await Brand.insertMany(brands)

    /* Category */
    const Category = require('../models/category')
    await Category.deleteMany() // !!! Clear collection.
    await Category.insertMany(categories)

    /* Firm */
    const Firm = require('../models/firm')
    await Firm.deleteMany() // !!! Clear collection.
    await Firm.insertMany(firms)

    /* Product */
    const Product = require('../models/product')
    await Product.deleteMany() // !!! Clear collection.
    await Product.insertMany(products)

    /* Purchase */
    const Purchase = require('../models/purchase')
    await Purchase.deleteMany() // !!! Clear collection.
    await Purchase.insertMany(purchases)

    /* Sale */
    const Sale = require('../models/sale')
    await Sale.deleteMany() // !!! Clear collection.
    await Sale.insertMany(sales)

    /* Finished */
    console.log('* Synchronized.')
}