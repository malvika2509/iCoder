const mongoose = require("mongoose");

//creating a connection
mongoose.connect('mongodb://localhost:27017/Registration', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connection succeed")).catch((error) => console.log(err));