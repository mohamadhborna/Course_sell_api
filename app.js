const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");

const webRouter = require("./modules/routes/webRoutes");
const apiRouter  =require("./modules/routes/api/index");
const config = require("./modules/config");

const app = express();

//Connnect to DB
mongoose.connect('mongodb://localhost:27017/roocket');
mongoose.Promise = global.Promise;

//*Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:'application/json'}));

//*Validator
app.use(expressValidator());


//*Routes
app.use("/api" , apiRouter);
app.use("/" , webRouter);


app.listen(4200 , () =>{console.log(`SERVER IS RUNNING ON PORT ${config.PORT}`)})