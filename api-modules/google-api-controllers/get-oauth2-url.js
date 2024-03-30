const Main = require('../../helper/main');
const { Sequelize, DataTypes,Op  } = require('sequelize');
const dbConnection = require('../../helper/db-connection');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()
const {google} = require('googleapis');
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
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_API_CLIENT_ID,
            process.env.GOOGLE_API_CLIENT_SECRET,
            process.env.GOOGLE_API_REDIRECT_URL
          );
        const scopes = [
            'https://www.googleapis.com/auth/books',
        ];
        const url = oauth2Client.generateAuthUrl({
            access_type: 'online',
            scope: scopes
        });
        this.res.status(200).json({
            response_code: "200",
            response_desc: status["200"].message,
            message: "Create oauth2 url",
            playload:{
                url:url
            }
        })
    }
}
module.exports = Controller;
