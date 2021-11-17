// const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");

const Authenticate = async (req,res,next) =>{
    try{
        const token = req.cookies.jwtToken;
        // console.log(token);
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
        // console.log("verify token",verifyToken);
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token });
        // console.log(rootUser);
        if(!rootUser) { throw new Error('user not found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }catch(err){
        console.log(err);
        res.status(401).send("unthorized user");
    }
}

module.exports = Authenticate;