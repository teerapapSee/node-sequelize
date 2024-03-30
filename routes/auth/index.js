const express = require('express');
const router = express.Router();
const RegisterControllers = require('../../api-modules/auth-controllers/register');
const LoginControllers = require('../../api-modules/auth-controllers/login');

const validator = require('./validator');

router.post('/register',validator.register,async (req,res,next)=>{
  try {
    const api = new RegisterControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});

router.post('/login',validator.login,async (req,res,next)=>{
  try {
    const api = new LoginControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});



module.exports = router;
