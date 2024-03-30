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
            const update = {}
            if(this.req.body.name){
                update['name'] = this.req.body.name
            }
            if(this.req.body.detail){
                update['detail'] = this.req.body.detail
            }
            if(this.req.body.author){
                update['author'] = this.req.body.author
            }
            const book = await Book.update(update,{
                where: {
                  id: this.req.body.id,
                },
              });
            this.res.status(200).json({
                response_code: "200",
                response_desc: status["200"].message,
                message: "Update book success",
                playload:{
                    ...book
                }
            })
        });
    }
}
module.exports = Controller;
