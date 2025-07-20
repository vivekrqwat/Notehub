// components/SideLeft.jsx
import { FaFolder, FaUserFriends, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { UserStore } from "../store/Userstroe";
import { useNavigate } from "react-router-dom";

export default function SideLeft() {
  const items = [
    { icon: <FaFolder />, label: "Directory" },
    { icon: <FaUserFriends />, label: "Friends" },
    { icon: <FaUsers />, label: "Collaboration" },
    { icon: <FaCalendarAlt />, label: "Schedule" },
  ];
  // const{user}=UserStore();
  const navigate=useNavigate()
  // console.log(user)
  const givepath = (i) => {
  console.log(i, "path");
  if (i === 'Directory') {
    navigate("/dir");
  } else if (i === "Collaboration") {
    navigate("/collab");
  } else {
    navigate("/");
  }
};

  return (
    <div className="h-full bg-[#1C1C1C] text-white p-4 space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={()=>givepath(item.label)}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2c2c2c] cursor-pointer text-sm"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
