const express = require('express');
const app = express();

const router = express.Router();

const userRoutes = require('./user-routes');

const { AuthRequestMidddlewares } = require('../../middlewares');

const { InfoController } = require('../../controllers');

router.get('/info', AuthRequestMidddlewares.checkAuth, InfoController.info);

router.use('/user', userRoutes);

module.exports = router;