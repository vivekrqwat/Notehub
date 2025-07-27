import {
  FaFolder,
  FaUserFriends,
  FaUsers,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserStore } from "../store/Userstroe";

export default function SideLeft() {
  const navigate = useNavigate();
  const{user}=UserStore()

  const items = [
    { icon: <FaFolder />, label: "Directory" },
    { icon: <FaUserFriends />, label: "Friends" },
    { icon: <FaUsers />, label: "Collaboration" },
    { icon: <FaCalendarAlt />, label: "Schedule" },
  ];

  const givepath = (label) => {
    if (label === "Directory") {
      navigate("/dir");
    } else if (label === "Collaboration") {
      navigate("/collab");
    } else if (label === "Profile") {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-full bg-[#1C1C1C] text-white p-4 space-y-4">
      {/* Profile item only for mobile/tablet (below lg) */}
      <div
        onClick={() => navigate(`profile/${user._id}`)}
        className="flex items-center py-1 rounded-md hover:bg-[#2c2c2c] cursor-pointer text-xs sm:text-sm block lg:hidden"
      >
        <span className="text-sm sm:text-base">
          <FaUser />
        </span>
        <span className="truncate ml-2">Profile</span>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => givepath(item.label)}
          className="flex items-center py-1 rounded-md hover:bg-[#2c2c2c] cursor-pointer text-xs sm:text-sm"
        >
          <span className="text-sm sm:text-base">{item.icon}</span>
          <span className="truncate ml-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
