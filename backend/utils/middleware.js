const jwt=require('jsonwebtoken');
const { error } = require('./Error');
const Usermodel = require('../models/User');

 async function assignwebtoken(data,res){
    // console.log(process.env.JT)
    const token=jwt.sign(data,process.env.JT,{
         expiresIn: "7d",
    })
<<<<<<< HEAD
   res.cookie("jwt", token, {
=======
res.cookie("jwt", token, {
>>>>>>> 1e3058dfd2ba7aaf33964f7e6d86113b7e5da806
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,         // Needed for HTTPS (Render)
  sameSite: "None",     // Allow cross-origin cookies
});
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
