import { useState, useEffect } from "react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

export default function Directory() {
  const [openDir, setOpenDir] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [dirdata, setdirdata] = useState([{}]);
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    const dirdata = async () => {
      try {
        const resdata = await axios.get("/api/dir/all/");
        console.log("dirdata", resdata);
        setdirdata(resdata.data);
      } catch (e) {
        console.log(e);
      }
    };
    dirdata();
  }, []);

  const getnotes = async (id) => {
    setOpenDir(openDir === id ? null : id);
    try {
      const notesdata = await axios.get(`/api/notes/${id}`);
      console.log(notesdata.data);
      setnotes(notesdata.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getGradeColorClass = (grade) => {
    switch (grade) {
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-400";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full h-full p-6 bg-[#1F1D1D] text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Directory</h2>
        <button className="bg-green-600 hover:bg-green-700 p-2 rounded-md">
          <FiPlus className="text-white text-lg" />
        </button>
      </div>

      <div className="space-y-4">
        {dirdata.map((dir, index) => (
          <div key={dir._id || index} className="bg-[#2C2C2C] rounded-lg p-4">
            {/* Directory Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-sm ${getGradeColorClass(
                    dir.grade
                  )}`}
                />
                <span className="text-lg font-semibold">{dir.Dirname}</span>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-sm text-white bg-green-700 px-2 py-1 rounded hover:bg-green-800"
                  onClick={() =>
                    setShowFormIndex(showFormIndex === index ? null : index)
                  }
                >
                  + Add
                </button>
                <button className="p-1" onClick={() => getnotes(dir._id)}>
                  <FiChevronDown
                    className={`transition-transform ${
                      openDir === dir._id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Add Note Form */}
            {showFormIndex === index && (
              <form className="bg-[#1c1c1c] p-4 rounded-md mb-3 space-y-3">
                <input
                  type="text"
                  placeholder="Heading"
                  className="w-full px-3 py-2 rounded bg-[#2d2d2d] text-white"
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  className="w-full px-3 py-2 rounded bg-[#2d2d2d] text-white"
                ></textarea>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-full px-3 py-2 rounded bg-[#2d2d2d] text-white"
                />

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <div className="w-6 h-4 rounded-sm bg-green-500"></div>
                    <input
                      type="radio"
                      name={`grade-${index}`}
                      value="green"
                      className="accent-green-500"
                    />
                    Green
                  </label>
                  <label className="flex items-center gap-2">
                    <div className="w-6 h-4 rounded-sm bg-red-500"></div>
                    <input
                      type="radio"
                      name={`grade-${index}`}
                      value="red"
                      className="accent-red-500"
                    />
                    Red
                  </label>
                  <label className="flex items-center gap-2">
                    <div className="w-6 h-4 rounded-sm bg-yellow-400"></div>
                    <input
                      type="radio"
                      name={`grade-${index}`}
                      value="yellow"
                      className="accent-yellow-400"
                    />
                    Yellow
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full"
                >
                  Add Note
                </button>
              </form>
            )}

            {/* Notes */}
   {openDir === dir._id && notes.length > 0 && (
  <div className="mt-2 space-y-2 pl-6">
    {notes.map((note, noteIdx) => (
      <div
        key={noteIdx}
        className="flex items-center hover:bg-[#3A3A3A] px-3 py-2 rounded-md cursor-pointer"
      >
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <span className="font-bold">{note.heading}</span>
            <FaArrowRight className="text-xl rotate-90 text-white" />
          </div>
          <span>{note.desc}</span>
        </div>
      </div>
    ))}
  </div>
)}





          </div>
        ))}
      </div>
    </div>
  );
}
