const express = require('express');
const { PORT } = require('./config');
const { ServerConfig, Logger } = require('./config')
const app = express();
const  { createProxyMiddleware } = require('http-proxy-middleware');
const { rateLimit } = require('express-rate-limit');
//const { Auth } = require('./utils/common');
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(limiter);
const router = express.Router();
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

app.use('/flightsService', createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to FLIGHT_SERVICE: ${req.url}`);
    }
}));

app.use('/bookingsService', createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to BOOKING_SERVICE: ${req.url}`);
    }
}));

app.listen(ServerConfig.PORT, ()=> {
    console.log(`Successfully started the server at ${ServerConfig.PORT}`);
    Logger.info('Server is live', {});
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoidXNlcjZAdXNlcjYuY29tIiwiaWF0IjoxNzI4MDk1MDMxLCJleHAiOjE3MjgwOTg2MzF9.xoozTPe_zIBTFjyFXSch8jWzjVUZq_U1r0Sko3iUIEo'
    // const response = Auth.verifyToken(token);
    // console.log(response);
})