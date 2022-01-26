const mongoose = require("mongoose");

//creating a connection
mongoose.connect('mongodb+srv://malvika:Ipad_1947@icoder.eyb0f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connection succeed")).catch((error) => console.log(err));