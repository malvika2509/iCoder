const bcrypt = require("bcryptjs/dist/bcrypt");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");

const registrationForm = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number
    },

    gender: {
        type: String,
    },

    qua: {
        type: String,
    },

    web: {
        type: String,
    },

    app: {
        type: String,
    },

    addr: {
        type: String
    },

    other: {
        type: String,
    },

    addr1: {
        type: String
    },

    country: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    c1: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    tokens:[{

        token:{
            type: String,
        required: true
        }
    }]



})

//generating token

// registrationForm.methods.generateAuthToken=async function(){
//     try {
//         console.log(this._id);
//         const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
//         this.tokens=this.tokens.concat({token:token});
//         //object destruction...name of key:value is same hence can do this:-
//         // this.tokens=this.tokens.concat({token});
//         await this.save();
//         return token;
//     } catch (error) {

//         res.send("The error part" + error);
//         console.log(error);
        
//     }
// }

registrationForm.pre("save", async function (next) {

    if (this.isModified("password")) {
        // const passwordHash = await bcrypt.hash(password, 10);
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
        // ---> if you do not wish to show in mongoose:-
        // this.cpassword=undefined; but here its required to show
    }

    next();
})


//now create a collection

const student = new mongoose.model("Student", registrationForm);
module.exports = student;