
const { StatusCodes } = require("http-status-codes")
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');

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


async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response; //isAuthenticated returns the user.id ; we attach it to the req so that other APIs know which user
            next();
        }
    } catch (error) {
        return res
                .status(error.statusCode)
                .json(error);
    }
}


async function isAdmin(req, res, next) {
        const response = await UserService.isAdmin(req.user);
        if(!response) {
            return res
            .status(StatusCodes.UNAUTHORIZED)    
            .json({message: 'User not authorized for this action'});    
        }
        next();
}

module.exports = {
    validateAuthRequest,
    checkAuth,
    isAdmin
}