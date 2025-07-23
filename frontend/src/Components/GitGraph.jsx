import React from "react";
import moment from "moment";
import { FaTrophy } from "react-icons/fa";

export default function GitGraph() {
  const activeDays = new Set(["2024-10-28", "2025-04-29", "2018-10-30"]);

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  function generateMonthGrid(days) {
    let grid = [];
    const daysSet = new Set(["2024-06-27", "2025-07-29", "2018-10-30"]);

    for (let i = 0; i < days; i++) {
      const day = moment().subtract(i, "days").format("YYYY-MM-DD");
      const isActive = daysSet.has(day);
      grid.unshift(
        <div
          className={`h-[12px] w-[12px] rounded-sm ${
            isActive ? "bg-yellow-400" : "bg-yellow-100"
          }`}
          key={i}
        />
      );
    }

    return grid;
  }

  const userdata = {
    email: "vivek@example.com", // Replace with dynamic email if needed
  };

  return (
    <div className="p-6 bg-[#0f172a]  flex flex-col items-center text-white">
      {/* Profile Section */}
      <div className="mb-6 text-center">
        <div className="text-lg font-bold">NoteHub Contributions</div>
        <div className="text-gray-400 text-sm break-words">{userdata.email}</div>

        {/* Trophy + Rank + League */}
        <div className="flex flex-col items-center mt-4">
          <FaTrophy className="text-yellow-400 text-2xl" />
          <div className="text-sm font-semibold mt-1">
            Rank: <span className="text-yellow-300">1000</span>
          </div>
          <div className="text-xs text-gray-300">
            League: <span className="text-yellow-200">Amateur</span>
          </div>
        </div>
      </div>

      {/* Git Graph */}
      <div className="grid grid-cols-12 gap-2 p-4 bg-white rounded-md shadow-xl text-black">
        {months.map((month, index) => (
          <div key={index}>
            <span className="block text-center text-sm font-medium mb-1">{month.name}</span>
            <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(auto-fill, 12px)" }}>
              {generateMonthGrid(month.days)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
