const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function signUp(req, res) {
    try {
        console.log(req.body);
        const user = await UserService.signUp({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res                                          
                .status(StatusCodes.CREATED)                
                .json(SuccessResponse);
                                     
    } catch (error) { 
        ErrorResponse.error = error;                                       
        return res                                          
                .status(error.statusCode)  
                .json(ErrorResponse);                      
    
    }
}

async function signIn(req, res) {
    try {
        console.log(req.body);
        const user = await UserService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res                                          
                .status(StatusCodes.CREATED)                
                .json(SuccessResponse);
                                     
    } catch (error) { 
        ErrorResponse.error = error;                                       
        return res                                          
                .status(error.statusCode)  
                .json(ErrorResponse);                      
    
    }
}


async function addRoletoUser(req, res) {
    try {
        console.log(req.body);
        const user = await UserService.addRoletoUser({
            id: req.body.id,
            role: req.body.role
        });
        SuccessResponse.data = user;
        return res                                          
                .status(StatusCodes.CREATED)                
                .json(SuccessResponse);
                                     
    } catch (error) { 
        ErrorResponse.error = error;                                       
        return res                                          
                .status(error.statusCode)  
                .json(ErrorResponse);                      
    
    }
}


module.exports = {
    signUp,
    signIn,
    addRoletoUser
}