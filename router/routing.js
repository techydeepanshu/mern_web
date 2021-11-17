const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
require("../db/conn"); // database connection file
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const logoutuser = require("../middleware/logoutuser");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.cookie("deepanshu", "nayak");
  res.send("this is home page by router");
});

router.post("/signup", async (req, res) => {
  // get data from client side
  const { name, email, phone, work, password, cpassword } = req.body;

  // check all field are filled
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the feild properly" });
  } else {
    try {
      // uske email ke according database mein document check
      const userStore = await User.findOne({ email: email });

      // "userStore" is true if data found in database
      if (userStore) {
        return res.status(403).json({ message: "User Already Exist" });

        // check "password" and confirm password both are same
      } else if (password != cpassword) {
        res
          .status(401)
          .json({ message: "password and confirm password must be same" });
      } else {
        // this section is rum when all condition are true
        console.log("registration section");

        // hashing the password
        const hashPassword = await bcrypt.hash(password, 12);

        // store data in "user" variable
        const user = new User({
          name: name,
          email: email,
          phone: phone,
          work: work,
          password: hashPassword,
          cpassword: hashPassword,
        });

        // yaha pe pre function call hoga jo ki schema wale page mein define hai lekin ye harbar call hota hai jo ki iski distadvantage hai
        const userSave = await user.save();

        // check all data is save in database if saved then it return true otherwise return false
        if (userSave) {
          return res.status(201).json({ message: "data successfully stored" });
        } else {
          return res.status(500).json({ message: "data not stored" });
        }
      }
    } catch {
      (err) => console.log(err);
    }
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log("this is signin");

    // get data from client side
    const { email, password } = req.body;

    // check data filled or not
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field properly" });
    }
    // else{
    console.log("this is if");

    // check data found in database if it founded it return true otherwise return false
    const validator = await User.findOne({ email: email });

    if (validator) {
      console.log("validator");

      // user ne jo password enter kiya hai usko database mein stored password se match krte hai
      const checkpswrd = await bcrypt.compare(password, validator.password);

      // if password not match
      if (!checkpswrd) {
        console.log("password not match");
        return res.status(422).json({ error: "password not match" });
      } else {
        console.log("password is match");

        // create token for authentication
        const token = await validator.generateAuthToken(); //this is function is define from "userschema" file
        console.log(token);

        // store token in cookie then send it client side
        res
          .cookie("jwtToken", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          })
          .send();
      }
    } else {
      // if data not found in database
      console.log("invailed credentional");
      return res.status(500).send("invailed credentional");
    }

    // }
  } catch {
    (err) => console.log(err);
  }
});

router.get("/about", authenticate, (req, res) => {
  console.log("this is about page");
  res.send(req.rootUser);
});
router.get("/getData", authenticate, (req, res) => {
  console.log("this is getData page");
  res.send(req.rootUser);
});
router.post("/contact", authenticate, async (req, res) => {
  console.log("this is getData page");
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(500).json({ error: "plz filled the field properly" });
  }
  const dataStore = await User.findOne({ _id: req.userID });

  if (!dataStore) {
    return res.status(400).json({ error: "data not found" });
  } else {
    const userData = await dataStore.addContactForm(
      name,
      email,
      phone,
      message
    );
    // console.log(userData);
    // await userData.save();
    if (!userData) {
      return res.status(401).json({ error: "data not saved" });
    } else {
      return res.status(200).json({ message: "data saved" });
    }
  }
});

router.get("/logout", logoutuser, (req, res) => {
  console.log("this is logout page");

  res.clearCookie("jwtToken");

  console.log("cookies clear");
  return res.status(200).send("user logout");
});

router.post("/sendmail", (req, res) => {
  console.log("sendmail");
  console.log(req.body.email)
  // console.log(req.email)
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.techydeepanshu.xyz",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "support@techydeepanshu.xyz", // generated ethereal user
        pass: "Chintu@1999", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let infoUser = await transporter.sendMail({
      from: '"MERN Web"<support@techydeepanshu.xyz>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "Enquiry Sent", // Subject line
      html: `<p>Hi <b>${req.body.name}</b></p>
      <p>Name : ${req.body.name}</p>
      <p>Email : ${req.body.email}</p>
      <p>Phone : ${req.body.phone}</p>
      <p>Message : ${req.body.message}</p>
      `, // html body
    });

    let infoAdmin = await transporter.sendMail({
      from: '"MERN Web"<support@techydeepanshu.xyz>', // sender address
      to: `deeepanshunayak@gmail.com`, // list of receivers
      subject: "New Enquiry", // Subject line
      html: `<p>Hi <b>New Enquiry</b></p>
      <p>Name : ${req.body.name}</p>
      <p>Email : ${req.body.email}</p>
      <p>Phone : ${req.body.phone}</p>
      <p>Message : ${req.body.message}</p>
      `, // html body
    });


    if(infoUser.messageId || infoAdmin.messageId){
        res.send("email sent");
        // return res.status(200).send("email sent");
    }else{
        res.send("email not sent");
        // return res.status(500).send("email not sent");
    }
    console.log("Message sent: %s", infoUser.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});

router.post("/sendmailregistered", (req, res) => {
  console.log("sendmailregistered");
  console.log(req.body.email)
  const registerData = req.body.emaildata;
  console.log(registerData)
  // console.log(req.email)
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.techydeepanshu.xyz",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "support@techydeepanshu.xyz", // generated ethereal user
        pass: "Chintu@1999", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let infoUser = await transporter.sendMail({
      from: '"MERN Web"<support@techydeepanshu.xyz>', // sender address
      to: `${registerData.email}`, // list of receivers
      subject: "Register Seccussfully on MERN Web", // Subject line
      html: `<p>Dear <b>${registerData.name}</b> ,</p>
      <p>Thank you for registering on <a href="http://techydeepanshu.xyz">MERN Web</a>. Your registration has been received. </p>
      <p>Now you can login on <a href="http://techydeepanshu.xyz">MERN Web</a></p>
      <p></p>
      <p>MERN Web Team</p>
      `, // html registerData
    });

    let infoAdmin = await transporter.sendMail({
      from: '"MERN Web"<support@techydeepanshu.xyz>', // sender address
      to: `deeepanshunayak@gmail.com`, // list of receivers
      subject: `registered New User : ${registerData.email}`, // Subject line
      html: `<p><b>New Registration</b></p>
      <p>New user has registered on your website <a href="http://techydeepanshu.xyz">MERN Web</a></p>
      `, // html body
    });


    if(infoUser.messageId || infoAdmin.messageId){
        res.send("email sent");
        // return res.status(200).send("email sent");
    }else{
        res.send("email not sent");
        // return res.status(500).send("email not sent");
    }
    console.log("Message sent: %s", infoUser.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});
module.exports = router;
