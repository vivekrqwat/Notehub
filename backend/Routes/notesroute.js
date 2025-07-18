const router=require('express').Router();
const Directorymodel = require('../models/Directory');
const Notesmodel = require('../models/notes');
const {error,response} = require('../utils/Error');
const mongoose = require("mongoose");
const { authenticate } = require('../utils/middleware');


// create
router.post("/",async(req,res)=>{

    const dirid=req.body.dirid;
    if(!dirid)return error(res,404,{message:"getting dirid"})

    try{
    const notes=await new Notesmodel(req.body)


    const updatedir=await Directorymodel.findByIdAndUpdate(dirid,{
        $push:{
            topic:{
                noteId:notes._id
            }
        }
    })
        
    if(!updatedir) return error(res,404,{message:"error on updating dir notes"})
   const savenotes=await notes.save();
    return response(res,200,savenotes)

    }
    catch(e){
        return error(res,500,{error:e,message:"on creation notes"})
    }
})

//getall
router.get('/all',async(req,res)=>{
    try{
        const allnotes=await Notesmodel.find();

        return response(res,200,allnotes)
    }catch(e){
         return error(res,500,{error:e,message:"on getting notes"})
    }
})
//getnotes by id
router.get('/:id',async(req,res)=>{
    // id is dirid
    const {id}=req.params
    
    try{ console.log(id,"get")
        const allnotes=await Notesmodel.find({dirid:id});
       
       
        

        return response(res,200,allnotes)
    }catch(e){
         return error(res,500,{error:e,message:"on getting notes"})
    }
})


// update dir
router.put("/:id",authenticate,async(req,res)=>{
    const {id}=req.params

    try{
        const updatedir= await Notesmodel.findByIdAndUpdate(id,
            {$set:req.body},{new:true}
        )
             return response(res,200,updatedir)

    }
    catch(e){
        return error(res,404,{error:e,message:"on updating dir"})
    }
})
//delete
router.delete("/:id",authenticate,async(req,res)=>{
    const {id}=req.params
    try{
        const note = await Notesmodel.findById(id);
    if (!note) return error(res, 404, { message: "Note not found" });
    const dirid=note.dirid;
   console.log(dirid.toString())
//    const dir=await Directorymodel.findById(dirid.toString());
//    console.log(dir);
//    response(res,200,"send");

//    const updateDir = await Directorymodel.findByIdAndUpdate(
//       dirid.toString(),
//         {$set:req.body},{new:true}
//     );
//      console.log(dirid)


        const deletenotes= await Notesmodel.findByIdAndDelete(id)
             return response(res,200,deletenotes)

    }
    catch(e){
        console.log(e);
        return error(res,404,{error:e,message:"on Deletion dir"})
    }
})













module.exports=router