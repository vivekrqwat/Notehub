const mongoose=require("mongoose")

const topicSchema = new mongoose.Schema({
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
   
    required: true
  }
});

const DirectorySchema= new mongoose.Schema({
    Dirname:{
        type:String,
        require:true,
        ref:"Directory"
    },
    desc:{
        type:String,
        max:[100,"not more than 100 words"]
    },
    topic:{
        type:[topicSchema],
        default:[]
    },
    grade:{
        type:String,
        default:"Green"
    }
      





},{timestamps:true})
const Directorymodel= new mongoose.model('Directory',DirectorySchema);
module.exports=Directorymodel