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
        try{
            const refreshToken = this.req?.signedCookies?.refresh_token
            if(refreshToken){
                const token = jwt.verify(refreshToken,process.env.JWT_SECRET)
                const newAccessTokenExp = new Date(Date.now() + 1000 * parseInt(process.env.ACCESS_TOKEN_EXP))
                const newAccessToken = jwt.sign({ 
                    profile:token.profile,
                    token_id:uuidv4(),
                    exp_in: newAccessTokenExp
                }, process.env.JWT_SECRET,{ expiresIn: parseInt(process.env.ACCESS_TOKEN_EXP) });
                const newRefreshTokenExp = new Date(Date.now() + 1000 * parseInt(process.env.REFRESH_TOKEN_EXP))
                const newRefreshToken = jwt.sign({ 
                    profile:token.profile,
                    token_id:uuidv4(),
                    exp_in: newRefreshTokenExp
                }, process.env.JWT_SECRET,{ expiresIn: parseInt(process.env.REFRESH_TOKEN_EXP) });
                this.res.cookie('refresh_token', newRefreshToken,{ signed: true, httpOnly: true ,secure: true , maxAge: 1000 * parseInt(process.env.REFRESH_TOKEN_EXP) })
                return {
                    token:newAccessToken,
                    exp:newAccessTokenExp
                }
            }else{
                const response = {
                    response_code: "203-2",
                    response_desc: status["203"]["sub"]["203-2"].message,
                    message: status["203"]["sub"]["203-2"].message,
                }
                this.res.status(203).send(response)
                return null
            }
        }catch(error){
            const response = {
                response_code: "500",
                response_desc: status["500"].message,
                message: error.message  || "Unexpected error"
            }
            this.res.status(500).send(response)
            return null
        }
    }
}
module.exports = Controller;
