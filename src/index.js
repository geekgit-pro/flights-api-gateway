const express = require('express');
const { PORT } = require('./config');
const { ServerConfig, Logger } = require('./config')
const app = express();
//const { Auth } = require('./utils/common');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const apiRoutes = require('./routes');

const router = express.Router();

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, ()=> {
    console.log(`Successfully started the server at ${ServerConfig.PORT}`);
    Logger.info('Server is live', {});
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoidXNlcjZAdXNlcjYuY29tIiwiaWF0IjoxNzI4MDk1MDMxLCJleHAiOjE3MjgwOTg2MzF9.xoozTPe_zIBTFjyFXSch8jWzjVUZq_U1r0Sko3iUIEo'
    // const response = Auth.verifyToken(token);
    // console.log(response);
})