import { FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserStore } from "../store/Userstroe";


export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("");

  // Set initial active tab based on URL
  useEffect(() => {
    if (location.pathname === "/post") setActiveTab("discussion");
    else setActiveTab("home");
  }, [location.pathname]);
  const{logout}=UserStore()

  return (
    <div className="w-full bg-[#1C1C1C] text-white flex flex-wrap justify-between items-center px-3 sm:px-5 py-1.5 sm:py-2 shadow-sm">
      {/* Left: Logo */}
      <div className="bg-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-yellow-400 font-bold text-[10px] sm:text-sm md:text-base mb-2 sm:mb-0">
        NOTE_<span className="text-white">HUB</span>
      </div>

      {/* Center: Navigation Tabs */}
      <div className="flex items-center space-x-2 sm:space-x-4 text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-0">
        <div
          className={`flex items-center gap-1 pb-0.5 cursor-pointer ${
            activeTab === "home"
              ? "text-yellow-400 border-b-[2px] border-yellow-400"
              : "text-white hover:text-yellow-400"
          }`}
          onClick={() => {
            setActiveTab("home");
            navigate("/");
          }}
        >
          <FaHome size={10} className="sm:size-[12px] md:size-[14px]" />
          <span className="text-[8px] sm:text-[10px] md:text-xs">HOME</span>
        </div>
        <div
          className={`pb-0.5 cursor-pointer ${
            activeTab === "discussion"
              ? "text-yellow-400 border-b-[2px] border-yellow-400"
              : "text-white hover:text-yellow-400 border-b border-gray-400"
          }`}
          onClick={() => {
            setActiveTab("discussion");
            navigate("/post");
          }}
        >
          <span className="text-[8px] sm:text-[10px] md:text-xs">Discussion</span>
        </div>
      </div>

      {/* Right: Logout Button */}
      <button className="bg-green-500 px-2 sm:px-3 md:px-4 py-[2px] sm:py-1 text-[8px] sm:text-xs md:text-sm rounded-md hover:bg-green-600 font-semibold"
      onClick={()=>logout()}
      >
        LOGOUT
      </button>
    </div>
  );
}
