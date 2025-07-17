const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema({
        username:{
            type:String,
            require:[true,"please enter username"]
        },
         email:{
            type:String,
            require:[true,"please enter username"],
            unique:true
        },
        password:{
            type:String,
            require:true
        },
        Profilepic:{
            type:String,
            default:""
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        follower:[],
        following:[]





})
const Usermodel= new mongoose.model('Users',UserSchema);
module .exports=Usermodel