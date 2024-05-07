require("dotenv").config()
const jwt = require('jsonwebtoken');
const GenerateAccessToken = require('../../api-modules/auth-controllers/generate-access-token');
const status = require('../../config/status-response.json');

const guard = async (req,res,next) => {
    if(
        req.url.indexOf('auth/') == -1
    ){
        if(req?.headers?.referer){
            if(req.headers.referer.indexOf('google-api/get-oauth2-callback') != -1){
                next()
                return
            }
        }
        const authorization = req.headers.authorization
        if(authorization){
            let checkToken = null
            try{
                checkToken = jwt.verify(authorization.substring(authorization.indexOf('Bearer ')+7),process.env.JWT_SECRET)
                console.log("guard  checkToken:", checkToken)
            } catch(error){
                if(error.message=="jwt expired"){
                    const generateAccessToken = new GenerateAccessToken(req,res,next)
                    const token = await generateAccessToken.execute()
                    if(token){
                        const response = {
                            response_code: "203-1",
                            response_desc: status["203"]["sub"]["203-1"].message,
                            message: status["203"]["sub"]["203-1"].message,
                            playload:token
                        }
                        res.status(203).send(response)
                    }
                    return
                }else{
                    next(new Error(error.message))
                }
            }
            if(checkToken){
                next()
            }else{
                next(new Error('Token invalid'))
            }
        }else{
            next(new Error('Token invalid'))
        }
    }else{
        next()
    }
}
module.exports = guard;