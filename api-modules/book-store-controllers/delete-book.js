const Main = require('../../helper/main');
const { Sequelize, DataTypes,Op  } = require('sequelize');
const dbConnection = require('../../helper/db-connection');
const Book = require('../../models/book');
const status = require('../../config/status-response.json');

class Controller extends Main{
    
    constructor(req,res,next){
        super(req,res,next)
        this.req = req
        this.res = res
        this.next = next
        this.dbConnection = dbConnection

    }

    async execute(){
        await this.dbConnection.transaction(async () => {
            const book = await Book.destroy({
                where: {
                  id: this.req.body.id,
                },
              });
            this.res.status(200).json({
                response_code: "200",
                response_desc: status["200"].message,
                message: "Delete book success",
                playload:{
                    id:this.req.body.id
                }
            })
        });
    }
}
module.exports = Controller;
