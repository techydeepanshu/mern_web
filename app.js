const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const dotenv = require('dotenv');     // dotenv package for hiding important credantial
dotenv.config({path:"./config.env"});
const PORT = process.env.PORT || 5000;
require('./db/conn');   // database connection file
const User = require('./model/userSchema');
app.use(express.json()) ; // json data ko access krne k liye and ye file router file se phle likhni hai
app.use(require('./router/routing'));  // require routing file



// middleware : matlab middleware page render hone se phle render hota hai

const middleware = (req,res,next) =>{
    console.log("this is middleware ");
    next();
}



// app.get("/",(req,res)=>{

//     res.send('hello world this is home page');
// })

app.get("/about",middleware,(req,res)=>{
    console.log("this is about page")
    res.send("this is about page");
})
// app.get("/contact",(req,res)=>{
//     res.send("this is contact page");
// })
app.get("/signin",(req,res)=>{
    res.send("this is signin page");
})
app.get("/signup",(req,res)=>{
    res.send("this is signup page");
})
app.get("*",(req,res)=>{
    res.send("page not found 404");
})

// this step for heroku
__dirname = path.resolve();
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/client/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}else{
    app.get("/",(req,res)=>{
        res.send("API is running..");
    });
}

app.listen(PORT,()=>{
    console.log(`lesting on port : ${PORT}`);
})