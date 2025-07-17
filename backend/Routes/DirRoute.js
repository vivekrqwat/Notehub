const router=require('express').Router();
const Directorymodel = require('../models/Directory');
const {error,response} = require('../utils/Error');


// create
router.post("/",async(req,res)=>{
    try{
    const dir=await new Directorymodel(req.body)

    const savedir=await dir.save();
    return response(res,200,savedir)

    }
    catch(e){
        return error(res,500,{error:e,message:"on creation dir"})
    }
})

//getall
router.get('/all',async(req,res)=>{
    try{
        const alldir=await Directorymodel.find();
        return response(res,200,alldir)
    }catch(e){
         return error(res,500,{error:e,message:"on getting dir"})
    }
})


// update dir
router.put("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const updatedir= await Directorymodel.findByIdAndUpdate(id,
            {set:req.body},{new:true}
        )
             return response(res,200,updatedir)

    }
    catch(e){
        return error(res,404,{error:e,message:"on updating dir"})
    }
})
//delete
router.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const deletedir= await Directorymodel.findByIdAndDelete(id)
             return response(res,200,deletedir)

    }
    catch(e){
        return error(res,404,{error:e,message:"on Deletion dir"})
    }
})













module.exports=router