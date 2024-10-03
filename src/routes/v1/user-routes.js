const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');

router.post(
    '/signUp',
    UserController.signUp
);




module.exports = router;