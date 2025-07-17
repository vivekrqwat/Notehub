const jwt=require('jsonwebtoken');
const { error } = require('./Error');
const Usermodel = require('../models/User');

 async function assignwebtoken(data,res){
    // console.log(process.env.JT)
    const token=jwt.sign(data,process.env.JT,{
         expiresIn: "7d",
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",

    })
    return token;


}


const authenticate=async (req,res,next)=>{
    try{
    const token=req.cookies.jwt
    // console.log(token)
    if(!token)return error(res,400,{message:"no token was given"})

    const decode=jwt.verify(token,process.env.JT);
    if(!decode)return error(res,400,{message:"no token was given"})
    const{email,id}=decode;
// console.log("decode",id)
  const user = await Usermodel.findById(id).select("-password");
  req.user=user;
  console.log("user",user.id)
  next();

    }catch(e){
        console.log(e);
        return error(res,400,{error:e,message:"error in authenticate"})}
}

module.exports={assignwebtoken,authenticate}