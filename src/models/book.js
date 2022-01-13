const mongoose = require("mongoose");
const res = require("express/lib/response");
const jwt=require("jsonwebtoken");
const bookForm = new mongoose.Schema({

    name: {
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

    subject: {
        type: String,

    },

    c1: {
        type: String,
    },
    c2: {
        type: String,
    },
    c3: {
        type: String,
    },
    c4: {
        type: String,
    },
    c5: {
        type: String,
    },
    c6: {
        type: String,
    },
    c7: {
        type: String,
    },
    c8: {
        type: String,
    }, 
    c9: {
        type: String,
    },
    text: {
        type: String,
    },
    tokens:[{

        token:{
            type: String,
        required: true
        }
    }]
})


//generating token

bookForm.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() },process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        //object destruction...name of key:value is same hence can do this:-
        // this.tokens=this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {

        res.send("The error part" + error);
        console.log(error);

    }
}

//now create a collection

const book = new mongoose.model("Book", bookForm);
module.exports = book;