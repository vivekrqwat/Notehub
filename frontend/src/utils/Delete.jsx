import axios from 'axios';
import React from 'react'

export default  async function Delete  (name,id) {
    console.log("delete is called")
    try{
        if(name=="post"){
    const res=await axios.delete(`/apii/post/postid/${id}`);
    console.log("post deleted")
    return;
        }
        if(name=="notes"){
            await axios.delete(`/apii/notes/dirdelete/${id}`)
        
        console.log("note deleted",id)
            return

        }
        if(name=='dir'){
            const res=await axios.delete(`/apii/dir/${id}`);
             console.log("dir",id)
             return

        }
         if(name=='noteid'){
            const res=await axios.delete(`/apii/notes/${id}`);
             console.log("",id)
             return

        }
        if(name=="content"){
            console.log(id)
             const res=await axios.delete(`/apii/notes/Notes/${id[0]}/content/${id[1]}`);
             console.log("conetent",id)
             return
            
        }
        return;

    }catch(e){
        console.log("delete..erroro",e)
    }
  
}
