const express = require('express');
const router = express.Router();
const Oauth2UrlControllers = require('../../api-modules/google-api-controllers/get-oauth2-url');
const Oauth2CallbackControllers = require('../../api-modules/google-api-controllers/get-oauth2-callback');

const validator = require('./validator');

router.post('/get-oauth2-url',async (req,res,next)=>{
  try {
    const api = new Oauth2UrlControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});

router.get('/get-oauth2-callback',validator.get_oauth2_token,async (req,res,next)=>{
  try {
    const api = new Oauth2CallbackControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});

module.exports = router;
