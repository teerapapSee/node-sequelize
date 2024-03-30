const Main = require('../../helper/main');
const { Sequelize, DataTypes,Op  } = require('sequelize');
const User = require('../../models/user');
const dbConnection = require('../../helper/db-connection');
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
            const userDup = await User.findAll({
                where: { email: this.req.body.email }
            });
            if(userDup.length){
                throw new Error('user duplicate')
            }else{
                const user = await User.create({
                    name: this.req.body.name,
                    email: this.req.body.email,
                    password: this.req.body.password,
                    active:true,
                });
                this.res.status(200).json({
                    response_code: "200",
                    response_desc: status["200"].message,
                    message: "Create user success",
                    playload:{
                        id:user.id
                    }
                })
            }
        });
    }
}
module.exports = Controller;
