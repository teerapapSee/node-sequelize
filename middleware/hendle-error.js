const status = require('../config/status-response.json');

const hendleError = (error,req,res,next) => {
    const response = {
        response_code: "500",
        response_desc: status["500"].message,
        message: error?.message || "Unexpected error"
    }
    res.status(500).send(response)
}
module.exports = hendleError;