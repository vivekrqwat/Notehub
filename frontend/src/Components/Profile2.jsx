import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GitGraph from "./GitGraph";
import scientist from"../avatar/scientist.png"
import { UserStore } from "../store/Userstroe";
import { FaTrophy, FaEdit, FaTrash } from "react-icons/fa";
import Delete from "../utils/Delete";

const Profile = () => {
  const { id } = useParams();
  const [userdata, setuserdata] = useState({});
  // const [postdata, setpostdata] = useState([]);
  const{user,post,postdata,notes,notedata}=UserStore()
  const[listdata,setlistdata]=useState();
   const[listname,setlistname]=useState("post");
  const[title,settitle]=useState({
    league:"begginner",
    title:"Note Novice"
  })
  
  const[score,setscore]=useState(0);
  const delepost=async(id)=>{
  try{
    console.log("deleted")
    console.log(listname)
    if(listname=='posts'){
    // const res=await axios.delete(`/apii/post/postid/${id}`);
    
    await Delete('post',id)
    
      setlistdata((prev) => prev.filter((item) => item._id !== id));
    }
    else if (listname=='notes'){
        // const res=await axios.delete(`/apii/dir/${id}`);
        // const notesdir= await axios.delete(`/apii/notes/dirdelete/${id}`)
        await Delete('dir',id)
        await Delete('notes',id)
        
        setlistdata((prev)=>prev.filter((item)=>item._id!=id))
        console.log("dir_deleted")
    }
  }catch(e){
    console.log("del",e);
  }

}

  useEffect(() => {
    const fetchdata = async () => {
      try {
        
        const res = await axios.get(`/apii/user/${id}`);
        console.log(id)
        notes(id)
        post(id)
        // console.log(idx``)

        // const res2 = await axios.get(`/apii/post/${id}`);
        // setpostdata(res2.data);
        setuserdata(res.data);
    
     
      
      } catch (e) {
        console.log(e);
      }
    };
    if (id) fetchdata();
  }, [id]);
 

// listdata

const listtransfer=()=>{
  console.log("listining",listname)
  if(listname=='posts'){
    setlistdata(postdata)
  }else if(listname=='notes') {
    setlistdata(notedata)
  }
  console.log(notedata)
}
useEffect(()=>{
  listtransfer();

},[listname])
//




//leauge data
const getleauge=(n)=>{
  if(n>=500&&n<=800){
    console.log(n)
settitle({ league: "Beginner", title: "Learning Sprout" });  }
else if(n>800&&n<=1000){
  settitle({ league: "Beginner", title: "Fresh Scriber" });
}
else if(n>1000&&n<=1200){
   settitle({ league: "Amateur", title: "Rising Scholar" });
}
else if(n>1200&&n<=1500){
   settitle({ league: "Amateur", title: "Knowledge Seeker" });
}else if(n>1500&&n<=1800){
   settitle({ league: "Amateur", title: "Syllabus Explorer" });
}else if(n>1800&&n<=2500){
   settitle({ league: " Professional Tier", title: "Note Master" });
}
else if(n>2500&&n<=3500){
   settitle({ league: " Professional Tier", title: " Study Strategist" });
}else if(n>3500){ settitle({ league: " Professional Tier", title: "Subject Sensei" });}
else{
  settitle({    league:"begginner",title:"Note Novice" })
}


}
console.log(user.submission.length,"user")
useEffect(()=>{

     setscore(user.submission.length)
  getleauge(user.submission.length)
},[])
// getleauge(700);



  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white px-4 py-6">
      {/* Layout container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Left Profile Card */}
<div className="bg-[#2a2a2a] w-full md:w-1/4 p-4 rounded-xl shadow-md min-h-[400px] max-h-[650px] overflow-y-auto">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 ">
              <img src={scientist} alt="" className="bg-gray-600 rounded-full mb-3" />
            </div>

            <div className="text-lg font-semibold text-center">{userdata?.username}</div>
            <div className="text-gray-400 text-sm break-words text-center mb-4">{userdata?.email}</div>

            {/* Large Trophy Icon and Info */}
            <div className="flex flex-col items-center mt-4 space-y-2">
              <span className="text-yellow-500 text-8xl">🏆</span>
              <div className="text-white font-semibold text-lg">{title?.title}</div>
              <div className="text-gray-400 text-base">Score:{score}</div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Contribution Graph */}
          <div className="bg-[#2a2a2a] rounded-xl shadow-md overflow-x-auto p-4">
            <div className="min-w-[400px]">
              <GitGraph activeDays={userdata?.submission} />
            </div>
          </div>

          {/* Submission/POST/Progress Tabs */}
          <div className="bg-[#2a2a2a] rounded-xl shadow-md p-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md" onClick={()=>setlistname('notes')}>Directories</button>
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md" onClick={()=>setlistname('posts')}>POSTs</button>
              {/* <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md">Progress</button> */}
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {listdata?.map((item, idx) => (
                 <div
                  key={idx}
                  className="flex justify-between items-center bg-[#1e1e1e] px-4 py-2 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-400" />
                    <span className="break-words">{item.desc}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-blue-400 hover:text-blue-500">
                      <FaEdit size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-500" onClick={()=>delepost(item._id)}>
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
