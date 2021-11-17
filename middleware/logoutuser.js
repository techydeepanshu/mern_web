// const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");

const LogoutUser = async (req,res,next) =>{
    try{
        console.log("logoutuser middleware");
        const token = req.cookies.jwtToken;
        // console.log(token);
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
        // console.log("verify token",verifyToken);
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token });
        // console.log(rootUser);
        if(!rootUser) { throw new Error('user not found')}
        rootUser.tokens = rootUser.tokens.filter((currentElement)=>{
            return currentElement.token != token;   
        })

        const userSave = await User.updateOne({_id:verifyToken._id,"tokens.token":token },{$set:{tokens:rootUser.tokens}});
        console.log(userSave);
        if(userSave){
            console.log("data updated");
        }else{
            console.log("data not updated");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }catch(err){
        console.log(err);
        res.status(401).send("unthorized user");
    }
}

module.exports = LogoutUser;