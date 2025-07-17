const mongoose=require("mongoose")

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