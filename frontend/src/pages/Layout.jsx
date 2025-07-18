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
        ${isSidebarVisible ? "w-[35%] sm:w-48" : "w-0"} 
        overflow-hidden`}
      >
        <SideLeft />
      </div>

      {/* Toggle arrow for small screens */}
      <div
        className="flex flex-col justify-center items-center w-5 bg-[#2c2c2c] text-white cursor-pointer sm:hidden"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? <FaArrowLeft /> : <FaArrowRight />}
      </div>

      {/* Main & profile */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex flex-1">
          {/* Main content box */}
          <div
            className={`
              overflow-y-auto p-4
              ${isSidebarVisible ? "w-[65%] sm:w-full" : "w-full"}
              transition-all duration-300
            `}
          >
            <Outlet />
          </div>

          {/* ProfileRight: hidden on phone */}
          <div className="hidden sm:block">
            <ProfileRight />
          </div>
        </div>
      </div>
    </div>
  );
}
