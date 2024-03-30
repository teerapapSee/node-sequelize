const Main = require('../../helper/main');
const { Sequelize, DataTypes,Op  } = require('sequelize');
const dbConnection = require('../../helper/db-connection');
const Book = require('../../models/book');
const status = require('../../config/status-response.json');
require("dotenv").config()
const axios = require('axios');
class Controller extends Main{
    
    constructor(req,res,next){
        super(req,res,next)
        this.req = req
        this.res = res
        this.next = next
        this.dbConnection = dbConnection

    }

    async execute(){
        const where = {}
        let googleBookSearch = ''
        let item = []
        if(this.req.body.name){
            where['name'] = this.req.body.name
            googleBookSearch += this.req.body.name+'+intitle'
        }
        if(this.req.body.author){
            where['author'] = this.req.body.author
        }
        const book = await Book.findAll({
            where: where
        });
        item = item.concat(book)
        if(googleBookSearch){
            const bookGoogle = await axios.get(process.env.GOOGLE_API_BOOK_URL+'?q='+googleBookSearch+':keyes') 
            item = item.concat(bookGoogle.data.items)
        }
        this.res.status(200).json({
            response_code: "200",
            response_desc: status["200"].message,
            message: "Search book success",
            playload:{
                ...item
            }
        })
    }
}
module.exports = Controller;
