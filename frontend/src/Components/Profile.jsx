import { useNavigate } from "react-router-dom";
import { UserStore } from "../store/Userstroe";

// components/ProfileRight.jsx
export default function ProfileRight() {
    const{user}=UserStore();
    const navigate=useNavigate();
   localStorage.setItem("id",user?._id)
    const Toprofile=()=>{
      const id=localStorage.getItem('id');
      navigate(`/profile/${id}`)
    }

  return (
    <div className="w-64 bg-[#1C1C1C] text-white h-full p-4 space-y-6" onClick={()=>Toprofile()}>
      {/* Profile */}
      <div className="bg-[#2B2B2B] rounded-lg p-4 text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-full bg-gray-600" />
        <h3 className="font-bold text-sm">{user?.username}</h3>
        <p className="text-xs text-gray-400">{user?.email}</p>
      </div>

      {/* Progress Report */}
      <div className="bg-[#2B2B2B] rounded-lg p-4">
        <h4 className="text-md font-semibold mb-2">Progress Report</h4>
        {/* Add content like bars or stats here later */}
        <div className="h-20 bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
}
