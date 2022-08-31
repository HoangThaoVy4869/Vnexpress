import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectionDB from './config/connectDB';

// import cors from 'cors';
require('dotenv').config();

let app = express();
var expressLayouts = require('express-ejs-layouts');
const multer = require('multer');

// app.use(cors({ origin: true }));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('layout', './layout');

viewEngine(app);
initWebRoutes(app);

connectionDB();

let port = process.env.PORT || 7777;
//Port === undefined => port = 7777

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})
