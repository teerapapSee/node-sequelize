const Main = require('../../helper/main');
const { Sequelize, DataTypes,Op  } = require('sequelize');
const dbConnection = require('../../helper/db-connection');
const status = require('../../config/status-response.json');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()
const {google} = require('googleapis');

class Controller extends Main{
    
    constructor(req,res,next){
        super(req,res,next)
        this.req = req
        this.res = res
        this.next = next
        this.dbConnection = dbConnection

    }

    async execute(){
        try {
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_API_CLIENT_ID,
                process.env.GOOGLE_API_CLIENT_SECRET,
                process.env.GOOGLE_API_REDIRECT_URL
              );
            
            const {tokens} = await oauth2Client.getToken(this.req.query.code)
            this.res.status(200).json({
                response_code: "200",
                response_desc: status["200"].message,
                message: "Get oauth2 token",
                playload:{
                    oauth2:tokens
                }
            })
        }catch(error){
            throw new Error('Oauth error '+error?.response?.data?.error)
        }
    }
}
module.exports = Controller;
