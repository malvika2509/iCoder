require('dotenv').config()
const express = require("express");
const app = express();
// const mongoose=require("mongoose");
const path = require("path");
const hbs=require("hbs");
const cookieParser=require("cookie-parser");


require("./db/connection");
const PORT = process.env.PORT || 3000

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"/templates/views");
const partial_path=path.join(__dirname,"/templates/partial");

// app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
hbs.registerPartials(partial_path);

app.set("view engine","hbs");

app.set("views",template_path);

app.use(express.static(static_path));

const mainrouter=require("./route/routes.js")

app.use(mainrouter);

app.listen(PORT, () => {

    console.log(`Listening On port ${PORT}`);

})




//npm install mongoose
//npm install hbs
