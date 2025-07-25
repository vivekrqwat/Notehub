
const { authenticate } = require('../utils/middleware');
const router=require('express').Router();
const ImageKit = require("imagekit");
const dotenv=require("dotenv");
const { error, response } = require('../utils/Error');
dotenv.config()
console.log(process.env.IMAGEKIT_PUBLIC_KEY)
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
router.get("/auth",async(req ,res)=>{
    try{
        console.log("yes")
    const authParams = imagekit.getAuthenticationParameters();
    return res.json(authParams)
    }
    catch(e){
                 return error(res,500,{error:e,message:"post_error"})

    }
})
module.exports=router