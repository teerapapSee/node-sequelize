const {body} = require('express-validator')

const validator = {} 
validator['get_oauth2_token'] = [
    body('code').not().isEmpty().withMessage('id is empty'),
]


module.exports = validator;