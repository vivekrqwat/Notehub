const express=require("express")
const app=express();
const dbconnect=require('./utils/dbconnect.js')
const dotenv=require("dotenv");
const userrouter=require("./Routes/Userroutes.js")
const postrouter=require("./Routes/Postrout.js")
const dirrouter=require("./Routes/DirRoute.js")
const notes=require("./Routes/notesroute.js")
const upload=require("./Routes/Upload.js")
const cookieParser = require("cookie-parser");
dotenv.config();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true // if using cookies
}));
app.use(cookieParser())
app.use(express.json());
app.use('/apii/user',userrouter);
app.use('/apii/post',postrouter);
app.use('/apii/dir',dirrouter);
app.use('/apii/notes',notes);
app.use('/apii/upcheck',upload)

dbconnect()
app.listen(8000,()=>{
    console.log("server connected")
})