const {body} = require('express-validator')

const validator = {} 
validator['create'] = [
    body('name').not().isEmpty().withMessage('name is empty'),
]
validator['update'] = [
    body('id').not().isEmpty().withMessage('id is empty'),
]
validator['delete'] = [
    body('id').not().isEmpty().withMessage('id is empty'),
]
validator['get_oauth2_token'] = [
    body('code').not().isEmpty().withMessage('id is empty'),
]


module.exports = validator;