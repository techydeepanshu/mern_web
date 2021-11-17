const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  contact_form: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ]
});

// we are hashing password
// userschema.pre("save", async function(next){
//     console.log("this is hashing function");
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//         this.cpassword = await bcrypt.hash(this.cpassword, 12);
//     }
//     next();
// });

// userschema.methods.hashPassword = async function(){
//     console.log("this is hashing function");
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//         this.cpassword = await bcrypt.hash(this.cpassword, 12);
//     }

// };

// WE ARE GENERATING TOKEN FOR AUTHORIZATION OF USER
userschema.methods.generateAuthToken = async function () {
  try {
    console.log("generateAuthToken function");
    const createToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY); // this line is create token
    this.tokens = this.tokens.concat({ token: createToken }); // this line is token add in database
    await this.save(); // save the token in database
    return createToken; // and return token for using cookie
  } catch (err) {
    console.log(err);
  }
};

userschema.methods.addContactForm = async function (name,email,phone,message) {
  try {
    console.log("addContactForm function");
    
    this.contact_form = this.contact_form.concat({name,email,phone,message}); // this line is token add in database
    await this.save(); // save the token in database
    return this.contact_form; // and return token for using cookie
  } catch (err) {
    console.log(err);
  }
};
const User = mongoose.model("USER", userschema);

module.exports = User;
