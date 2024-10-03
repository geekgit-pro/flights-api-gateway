
const { StatusCodes } = require("http-status-codes")
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAuthRequest(req, res, next) {
    console.log(req.body);
 
    if(!req.body.email) {
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = new AppError(['user Email not found in request '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.password) {
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = new AppError(['user password not found in request '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }
    next();
}

module.exports = {
    validateAuthRequest
}