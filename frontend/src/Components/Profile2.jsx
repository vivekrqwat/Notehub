import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const progressData = [
  { subject: "@Mca/web", color: "bg-green-600" },
  { subject: "@Mca/Java", color: "bg-green-600" },
  { subject: "@Dsa/sorting", color: "bg-red-600" },
  { subject: "@Mca/figma", color: "bg-yellow-500" },
];

const Profile = () => {
 const { id } = useParams();
 const [userdata,setuserdata]=useState();
 const [postdata,setpostdata]=useState();
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const res=await axios.get(`/api/user/${id}`);
                const res2=await axios.get(`/api/post/${id}`)

                console.log("post",res2.data)
            setpostdata(res2.data)
            setuserdata(res.data)
        
            }catch(e){console.log(e)}
            
        }
        if (id) fetchdata();
    },[])
 console.log("user",postdata)



  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white px-4 py-6">
      {/* Layout container */}
      <div className="max-w-7xl mx-auto flex gap-6">
        
        {/* Left Profile Card */}
        <div className="bg-[#2a2a2a] w-1/4 p-4 rounded-xl shadow-md">
          <div className="text-lg font-bold mb-4 text-yellow-400">Profile</div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-600 rounded-full mb-3"></div>
            <div className="text-lg font-semibold">{userdata?.username}</div>
            <div className="text-gray-400 text-sm">{userdata?.email}</div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Top Placeholder */}
          <div className="bg-[#2a2a2a] h-32 rounded-xl shadow-md"></div>

          {/* Submission/POST/Progress Tabs */}
          <div className="bg-[#2a2a2a] rounded-xl shadow-md p-4">
            <div className="flex gap-4 mb-4">
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md">Submission</button>
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md">POSTs</button>
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md">Progress</button>
            </div>
            <div className="space-y-3">
              {postdata?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#1e1e1e] px-4 py-2 rounded-md">
                  <div className={`w-4 h-4 rounded-full bg-green-400`}></div>
                  <span>{item.desc}</span>
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
