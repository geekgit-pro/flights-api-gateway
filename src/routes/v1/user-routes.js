const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');
const { AuthRequestMidddlewares } = require('../../middlewares')

router.post(
    '/signUp',
    AuthRequestMidddlewares.validateAuthRequest,
    UserController.signUp
);

router.post(
    '/signIn',
    AuthRequestMidddlewares.validateAuthRequest,
    UserController.signIn
);

router.post(
    '/role',
    AuthRequestMidddlewares.checkAuth,
    AuthRequestMidddlewares.isAdmin,
    UserController.addRoletoUser
);


module.exports = router;