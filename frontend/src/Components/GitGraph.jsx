import React from "react";
import moment from "moment";
import { UserStore } from "../store/Userstroe";

export default function GitGraph({ activeDays = [] }) {
  const {user}=UserStore()
  const activeSet = new Set(user?.submission);
  console.log(user?.submission)

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

  function giveMonthArray(monthIndex, daysInMonth) {
    const currentYear = moment().year();
    let daygrid = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment({ year: currentYear, month: monthIndex, day: i }).format("YYYY-MM-DD");
      const isActive = activeSet.has(date);

      daygrid.push(
        <div
          key={date}
          title={date}
          className={`h-4 w-4 rounded-sm ${
            isActive ? "bg-yellow-400" : "bg-yellow-100"
          }`}
        ></div>
      );
    }

    return daygrid;
  }

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-xl overflow-x-auto">
      <div
        className="grid gap-6 min-w-[800px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}
      >
        {months.map((month, index) => (
          <div key={index}>
            <div className="text-xs font-semibold text-gray-300 mb-2 text-center">
              {month.name}
            </div>
            <div
              className="grid gap-[3px] justify-center"
              style={{ gridTemplateColumns: "repeat(auto-fill, 16px)" }}
            >
              {giveMonthArray(index, month.days)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
