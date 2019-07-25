// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const Symptom = db.define('symptom', {
    Symptom: {
        type: Sequelize.STRING
    },
    Symptom_Description: {
        type: Sequelize.STRING
    },
});

module.exports = Symptom;