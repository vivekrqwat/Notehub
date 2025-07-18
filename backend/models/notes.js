const mongoose=require("mongoose")
const contenschema= new mongoose.Schema({
    heading:{type:String,default:""},
    desc:{type:String,default:""},
    img:{type:String,default:""}
})

const noteSchema= new mongoose.Schema({
    dirid:{
          type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    desc:{
        type:String,
        default:""
    },
    heading:{
        type:String,
        default:""
    },
    content:{
        type:[contenschema]
    }
    ,
    grade:{
        type:String
    },
    img:{
        type:String,
        default:""
    }
      





},{timestamps:true})
const Notesmodel= new mongoose.model('Notes',noteSchema);
module.exports=Notesmodel