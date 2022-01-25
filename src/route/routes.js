require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const student = require("../models/information");
const book = require("../models/book");
const { render } = require('express/lib/response');

console.log(process.env.SECRET_KEY);

router.get('/', (req, res) => {
    res.render("cover.hbs");
})

router.get('/index.hbs', (req, res) => {
    res.render("index.hbs");
})

router.get('/about.hbs', (req, res) => {
    res.render("about.hbs");
})

router.get('/appCode.hbs', (req, res) => {
    res.render("appCode.hbs");
})

router.get('/webCode.hbs', (req, res) => {
    res.render("webCode.hbs");
})

router.get('/book.hbs', (req, res) => {
    res.render("book.hbs");
})


router.post('/book.hbs', async (req, res) => {

    try {
        const bookStudent = new book({

            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            subject: req.body.subject,
            c1: req.body.c1,
            c2: req.body.c2,
            c3: req.body.c3,
            c4: req.body.c4,
            c5: req.body.c5,
            c6: req.body.c6,
            c7: req.body.c7,
            c8: req.body.c8,
            c9: req.body.c9,
            text: req.body.text

        });

        const token = await bookStudent.generateAuthToken();
        // console.log("The token part " + token);

        // res.cookie() function is used to set the cookie name to value
        // the 'value' parameter maybe string or object converted to JSON

        // res.cookie(name, value, [options]);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3000000),
            //milliseconds -30000
            httpOnly: true
        });

        const booked = await bookStudent.save();
        // console.log("The page part " + booked);

        res.status(201).render("courses");
    }

    catch (error) {
        console.log("error is " + error);

        res.status(400).send(error);
    }
})

router.get('/courses.hbs', auth, (req, res) => {
    // console.log(`this is the cookie ${req.cookies.jwt}`);
    res.render("courses.hbs");
})

router.get('/design.hbs', (req, res) => {
    res.render("design.hbs");
})

router.get('/form.hbs', (req, res) => {
    res.render("form.hbs");
})

router.post('/form.hbs', async (req, res) => {

    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {
            const registerStudent = new student({

                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                qua: req.body.qua,
                web: req.body.web,
                app: req.body.app,
                addr: req.body.addr,
                other: req.body.other,
                addr1: req.body.addr1,
                country: req.body.country,
                password: password,
                cpassword: cpassword,
                c1: req.body.c1,
                comment: req.body.comment


            });

            //defining token here

            const token = await registerStudent.generateAuthToken();
            // console.log("The token part " + token);

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                //milliseconds -30000
                httpOnly: true
            });

            const registered = await registerStudent.save();
            console.log("The page part " + registered);

            res.status(201).render("cover.hbs");
        } else {
            res.send("Passwords not match");
        }
    }
    catch (error) {

        res.status(400).send(error);
        console.log("error");
    }
})

router.get('/login.hbs', (req, res) => {
    res.render("login.hbs");
})

router.post('/login.hbs', async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await student.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userEmail.password);

        const token = await userEmail.generateAuthToken();
        // console.log("The token part " + token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30000),
            //milliseconds -30000
            httpOnly: true
        });


        if (isMatch) {
            res.status(201).render("index");
        }
        else {
            res.send("passwords do not match");
        }

    } catch (error) {
        console.log(error);
        res.status(400).send("Invalid login details");
    }

})
router.get('/privacy.hbs', (req, res) => {
    res.render("privacy.hbs", {
        title: "Privacy"
    });
})


module.exports = router;