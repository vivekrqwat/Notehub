import { useState } from "react";
import Navbar from "../Components/Nav";
import ProfileRight from "../Components/Profile";
import SideLeft from "../Components/Sideleft";
import { Outlet } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#1F1D1D]">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300
          ${isSidebarVisible ? "w-24 md:w-[10%]" : "w-0"} 
          overflow-hidden`}
      >
        <SideLeft />
      </div>

      {/* Toggle Arrow - only shows on small screens */}
      <div
        className="flex flex-col justify-center items-center w-5 bg-[#2c2c2c] text-white cursor-pointer md:hidden"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? <FaArrowLeft /> : <FaArrowRight />}
      </div>

      {/* Main + Profile */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex flex-1">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </div>

          {/* Right Panel (hidden on small screens) */}
          <div className="hidden sm:block">
            <ProfileRight />
          </div>
        </div>
      </div>
    </div>
  );
}
