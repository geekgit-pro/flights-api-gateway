const express = require('express');
const app = express();

const router = express.Router();

const userRoutes = require('./user-routes');

const { InfoController } = require('../../controllers');

router.get('/info', InfoController.info);

router.use('/signUp', userRoutes);

module.exports = router;