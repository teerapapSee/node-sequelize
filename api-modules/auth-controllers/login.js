const Main = require('../../helper/main');
const User = require('../../models/user');
const dbConnection = require('../../helper/db-connection');
const status = require('../../config/status-response.json');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()
class Controller extends Main{
    
    constructor(req,res,next){
        super(req,res,next)
        this.req = req
        this.res = res
        this.next = next
        this.dbConnection = dbConnection

    }

    async execute(){
        const user = await User.findOne({
            where: { email: this.req.body.email }
        });
        if(user){
            if(user.authenticate(this.req.body.password)){
                const accessTokenExp = new Date(Date.now() + 1000 * parseInt(process.env.ACCESS_TOKEN_EXP))
                const accessToken = jwt.sign({ 
                    profile:{
                        name:user.name,
                        email:user.email,
                    },
                    token_id:uuidv4(),
                    exp_in: accessTokenExp
                }, process.env.JWT_SECRET,{ expiresIn: parseInt(process.env.ACCESS_TOKEN_EXP) });
                const refreshTokenExp = new Date(Date.now() + 1000 * parseInt(process.env.REFRESH_TOKEN_EXP))
                const refreshToken = jwt.sign({ 
                    profile:{
                        name:user.name,
                        email:user.email,
                    },
                    token_id:uuidv4(),
                    exp_in: refreshTokenExp
                }, process.env.JWT_SECRET,{ expiresIn: parseInt(process.env.REFRESH_TOKEN_EXP) });
                this.res.cookie('refresh_token', refreshToken,{ signed: true, httpOnly: true ,secure: true , maxAge: 1000 * parseInt(process.env.REFRESH_TOKEN_EXP) })
                this.res.status(200).json({
                    response_code: "200",
                    response_desc: status["200"].message,
                    playload:{
                        token:accessToken,
                        exp:accessTokenExp
                    }
                })
            }else{
                throw new Error('Not found user')
            }
        }else{
            throw new Error('Not found user')
        }
    }
}
module.exports = Controller;
