const { Sequelize } = require('sequelize');
  
const dbConnection = new Sequelize('postgres', 'postgres', '081616', {
  host: 'localhost',
  dialect:'postgres',
  pool: {
    max: 5,
    min: 1,
    idle: 10000,
    evict: 10000,
  }
});




module.exports = dbConnection;