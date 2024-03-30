const { Sequelize, DataTypes } = require('sequelize');
const dbConnection = require('../helper/db-connection');
const Book = dbConnection.define('books', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, 
  {
      
});
Book.sync().then(() => {
  console.log("Book Model synced");
});

module.exports = Book;