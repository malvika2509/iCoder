//middleware page ...dont page the page unless authorised
const jwt=require("jsonwebtoken");
const student=require("../models/information");

const auth=async (req,res,next)=>{
    try {

        const token=req.cookies.jwt;
        const verifyUser= jwt.verify(token,process.env.SECRET_KEY);
        // console.log(verifyUser);

        const user=await student.findOne({_id:verifyUser._id});
        // console.log(user);


        next();
        
    } catch (error) {
        console.log("ERROR "+error);
        res.status(400).send(error);
        
    }
}

module.exports=auth;