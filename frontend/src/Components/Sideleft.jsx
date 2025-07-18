// components/SideLeft.jsx
import { FaFolder, FaUserFriends, FaUsers, FaCalendarAlt } from "react-icons/fa";

export default function SideLeft() {
  const items = [
    { icon: <FaFolder />, label: "Directory" },
    { icon: <FaUserFriends />, label: "Friends" },
    { icon: <FaUsers />, label: "Collaboration" },
    { icon: <FaCalendarAlt />, label: "Schedule" },
  ];

  return (
    <div className="h-full bg-[#1C1C1C] text-white p-4 space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2c2c2c] cursor-pointer text-sm"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
