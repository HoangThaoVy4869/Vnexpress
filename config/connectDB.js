const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vnexpress', 'root', '01257604435', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectionDB;