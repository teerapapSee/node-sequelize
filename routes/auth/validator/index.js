const {body} = require('express-validator')

const validator = {} 
validator['register'] = [
    body('name').not().isEmpty().withMessage('name is empty'),
    body('email').not().isEmpty().withMessage('email is empty').isEmail().withMessage('invalid email'),
    body('password').not().isEmpty().withMessage('password is empty').isLength({min:6}).withMessage('password lendth min 6')
]

validator['login'] = [
    body('email').not().isEmpty().withMessage('email is empty').isEmail().withMessage('invalid email'),
    body('password').not().isEmpty().withMessage('password is empty')
]

module.exports = validator;