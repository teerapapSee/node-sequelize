const express = require('express');
const router = express.Router();
const CreateBookControllers = require('../../api-modules/book-store-controllers/create-book');
const EditBookControllers = require('../../api-modules/book-store-controllers/edit-book');
const GetListBookControllers = require('../../api-modules/book-store-controllers/get-list-book');
const DeleteBookControllers = require('../../api-modules/book-store-controllers/delete-book');

const validator = require('./validator');

router.post('/create',validator.create,async (req,res,next)=>{
  try {
    const api = new CreateBookControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});

router.post('/update',validator.update,async (req,res,next)=>{
  try {
    const api = new EditBookControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});

router.post('/delete',validator.delete,async (req,res,next)=>{
  try {
    const api = new DeleteBookControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});

router.post('/list',async (req,res,next)=>{
  try {
    const api = new GetListBookControllers(req,res,next)
    await  api.execute()
  }catch (error) {
    next(error)
  }
});

module.exports = router;
