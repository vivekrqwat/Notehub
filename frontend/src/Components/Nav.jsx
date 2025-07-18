import { FaHome } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="w-full bg-[#1C1C1C] text-white flex flex-wrap justify-between items-center px-4 sm:px-6 py-2 shadow-sm">
      {/* Left: Logo */}
      <div className="bg-black px-3 py-1 rounded-full text-yellow-400 font-bold text-sm sm:text-base mb-2 sm:mb-0">
        NOTE_<span className="text-white">HUB</span>
      </div>

      {/* Center: Navigation Tabs */}
      <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm mb-2 sm:mb-0">
        <div className="flex items-center gap-1 text-yellow-400 border-b-[2px] border-yellow-400 pb-1 cursor-pointer">
          <FaHome size={12} className="sm:size-[14px]" />
          <span>HOME</span>
        </div>
        <div className="text-white hover:text-yellow-400 cursor-pointer">
          <span className="border-b border-gray-400 pb-1">Discussion</span>
        </div>
      </div>

      {/* Right: Logout Button */}
      <button className="bg-green-500 px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-md hover:bg-green-600 font-semibold">
        LOGOUT
      </button>
    </div>
  );
}
