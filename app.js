const express =require("express");
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const path = require("path")
const dotenv=require("dotenv");
const app = express();


dotenv.config({path:"backend/config/config.env"});
app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

const user=require("./routes/routes")
app.use("/api/v1", user);

module.exports = app




