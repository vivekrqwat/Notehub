import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GitGraph from "./GitGraph";

const Profile = () => {
  const { id } = useParams();
  const [userdata, setuserdata] = useState({});
  const [postdata, setpostdata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`/api/user/${id}`);
        const res2 = await axios.get(`/api/post/${id}`);
        setpostdata(res2.data);
        setuserdata(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    if (id) fetchdata();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white px-4 py-6">
      {/* Layout container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Left Profile Card */}
<div className="bg-[#2a2a2a] w-full md:w-1/4 p-4 rounded-xl shadow-md min-h-[400px]">          <div className="text-lg font-bold mb-4 text-yellow-400">Profile</div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-600 rounded-full mb-3"></div>

            <div className="text-lg font-semibold text-center">{userdata?.username}</div>
            <div className="text-gray-400 text-sm break-words text-center mb-4">{userdata?.email}</div>

            {/* Large Trophy Icon and Info */}
            <div className="flex flex-col items-center mt-4 space-y-2">
              <span className="text-yellow-500 text-8xl">🏆</span>
              <div className="text-white font-semibold text-lg">Beginner League</div>
              <div className="text-gray-400 text-base">Score: 500</div>
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
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md">Submission</button>
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md">POSTs</button>
              <button className="px-4 py-2 bg-[#1e1e1e] text-white rounded-md">Progress</button>
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {postdata?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#1e1e1e] px-4 py-2 rounded-md">
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  <span className="break-words">{item.desc}</span>
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
