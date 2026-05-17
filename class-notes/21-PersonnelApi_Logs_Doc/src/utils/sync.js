"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// SYCHRONIZATION:

module.exports = async function() {

    // return null;

    /* REMOVE DATABASE */
    const { mongoose } = require('../configs/db.connection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */
    
    /* Department & Personnel */
    const Department = require('../models/department.model')
    const Personnel = require('../models/personnel.model')
    const departments = [
        "FullStack Department",
        "DevOps Department",
        "CyberSec Department",
    ]
    departments.forEach(value => {
        // Department.create:
        Department.create({ name: value }).then((department) => {
            console.log('- Department Added.')
            // Personnel.create:
            for (let i in [...Array(10)]) {
                Personnel.create({
                    departmentId: department._id,
                    username: "test" + (value[0] + i),
                    password: "1234",
                    firstName: "firstName",
                    lastName: "lastName",
                    phone: `1234567890${i}`,
                    email: "test" + (value[0] + i) + "@site.com",
                    title: "title",
                    salary: 2500,
                    description: "description",
                    isActive: true,
                    isAdmin: false,
                    isLead: false,
                    startedAt: "2026-05-12 12:14:15"
                })
            }
            console.log('- Personnels Added.')
        })
    })
    /* Department & Personnel */
}