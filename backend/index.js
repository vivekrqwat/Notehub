const express=require("express")
const app=express();
const dbconnect=require('./utils/dbconnect.js')
const dotenv=require("dotenv");
const userrouter=require("./Routes/Userroutes.js")
const postrouter=require("./Routes/Postrout.js")
const dirrouter=require("./Routes/DirRoute.js")
const notes=require("./Routes/notesroute.js")
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(cookieParser())
app.use(express.json());
app.use('/api/user',userrouter);
app.use('/api/post',postrouter);
app.use('/api/dir',dirrouter);
app.use('/api/notes',notes);

dbconnect()
app.listen(8000,()=>{
    console.log("server connected")
})