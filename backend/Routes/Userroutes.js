const Postmodel = require('../models/Post');
const Usermodel = require('../models/User');
const {error,response} = require('../utils/Error');
const bcrypt=require("bcryptjs");
const {assignwebtoken,authenticate} = require('../utils/middleware');
const moment = require("moment");
const router=require('express').Router();

//auth
router.get("/check",authenticate,async(req,res)=>{
    try{
        const user=req.user;
        if(!user)return
        // console.log("backend user",user)
        return response(res,200,user);
    }catch(e){
        return error(res,400,{message:"not valid"})
    }

})
//register

router.post('/signup',  async (req,res)=>{
   
    try{        const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);

            const newuser=await new Usermodel(req.body);
            if(!newuser)error(res,401,"invalid credential");
            const usertokendata={
                email:newuser.email,
                username:newuser.username,
                id:newuser._id.toString()

            }

            const saveuser=await newuser.save();
           await  assignwebtoken(usertokendata,res);
       return  response(res,200,usertokendata)
    }catch(e){
       return error(res,500,{error:e,message:"signup_error"})
    }

})
//login

router.post('/login',async (req,res)=>{
    const{username,email,password}=req.body
    
   
    try{
        const user=await Usermodel.findOne({email:email});
        if(!user)return error(res,401,"invalid credential");
       
        const validpassowrd=await bcrypt.compare(password, user.password)
        if(!validpassowrd)error(res,401,"invalid password");
         const usertokendata={
                eamil:user.email,
                user:user.username,
                id:user._id.toString()

            }
       await  assignwebtoken(usertokendata,res);
        return response(res,200,usertokendata)
    }catch(e){
         return error(res,500,{error:e,message:"login_error"})
    }

})
//get
router.get('/:id',authenticate,async (req,res)=>{
   const {id}=req.params
    if (req.user._id.toString() !== id) {
        return error(res, 400, { message: "Not a valid user" });
    }
    
    // console.log(id)
    try{
        const user=await Usermodel.findById(id);
          if(!user)error(res,401,"user not found");
        //   const {password,...other}=user._doc
          return response(res,200,user)
    }
    catch(e){
    return error(res,500,{error:e,message:"getting_id__error"})

    }

})
//getall
router.get('/',async (req,res)=>{
   
    try{
        const user=await Usermodel.find();
          if(!user)error(res,401,"user not found");
         const safeUsers = user.map(({ _doc }) => {
            const { password, ...rest } = _doc;
            return rest;
        });
          return response(res,200,safeUsers)
    }
    catch(e){
    return error(res,500,{error:e,message:"getting_id__error"})

    }

})
//update user
router.put('/update/:id',async(req,res)=>{
     const {id}=req.params
    if (req.user._id.toString() !== id) {
        return error(res, 400, { message: "Not a valid user" });
    }
     const {password}=req.body
    try{
        if(password){
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(password,salt)
        }
 const updatedUser = await Usermodel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true } 
        ); 
         if (!updatedUser) return error(res,400,"no updates")
        return response(res,200,updatedUser)


    }catch(e){
    return error(res,500,{error:e,message:"updating error"})

    }
})
//submmisiion
router.post("/submission/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    const formatted = moment().format("YYYY-MM-DD");
console.log("hello")
    console.log("✅ Submission attempt for:", formatted);
    console.log("momment",uid)

    const updatedUser = await Usermodel.findByIdAndUpdate(
      uid,
      { $addToSet: { submission: formatted } }, // Ensures uniqueness
      { new: true }
    );

    if (!updatedUser) {
      return error(res, 404, { message: "User not found" });
    }

    return response(res, 200, updatedUser);
  } catch (e) {
    console.error("❌ Error updating submission:", e);
    return error(res, 500, { error: e, message: "Updating error" });
  }
});
//logout
router.post("/logout", async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    return error(res, 500, { error: e, message: "loging out error" });
  }
});



module.exports=router