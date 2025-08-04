import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import axios from "axios";
import { UserStore } from "../store/Userstroe";
import { useNavigate } from "react-router-dom";
import Delete from "../utils/Delete";

const API = import.meta.env.VITE_API_URL;

export default function Directory() {
  const [openDir, setOpenDir] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [dirdata, setdirdata] = useState([]);

  // ✅ Notes stored per directory
  const [notesMap, setNotesMap] = useState({});

  const { user } = UserStore();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const fetchDirData = async () => {
    try {
      const resdata = await axios.get(`${API}/apii/dir/${user._id}`, {
        withCredentials: true,
      });
      setdirdata(resdata.data);
    } catch (e) {
      console.log(e);
    }
  };

  const Delnotes = async (noteId, dirId) => {
    try {
      await Delete("noteid", noteId);
      setNotesMap((prev) => ({
        ...prev,
        [dirId]: prev[dirId].filter((note) => note._id !== noteId),
      }));
      // fetchDirData(); // Refresh directories after deletion
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDirData();
    localStorage.removeItem("noteid");
  }, []);

  const getnotes = async (id) => {
    setOpenDir(openDir === id ? null : id);
    try {
      const notesdata = await axios.get(`${API}/apii/notes/${id}`, {
        withCredentials: true,
      });
      setNotesMap((prev) => ({
        ...prev,
        [id]: notesdata.data,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const Deldir = async (id) => {
    try {
      await Delete("dir", id);
      await Delete("notes", id);
    } catch (e) {
      console.log("error",e);
      console.log(e);
    }
    fetchDirData();
  };

  const setNotes = async (id, e) => {
    e.preventDefault();
    const data = {
      dirid: id,
      desc: e.target.desc.value,
      heading: e.target.heading.value,
      grade: e.target.grade.value,
    };
    try {
      setloading(true);
      await axios.post(`${API}/apii/notes/`, data, {
        withCredentials: true,
      });
      await axios.post(`${API}/apii/user/submission/${user._id}`, {}, {
        withCredentials: true,
      });
      getnotes(id); // Refresh notes for this directory
    } catch (e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  };

  const getGradeColorClass = (grade) => {
    switch (grade) {
      case "green": return "bg-green-500";
      case "red": return "bg-red-500";
      case "yellow": return "bg-yellow-400";
      default: return "bg-gray-500";
    }
  };
    const getGrade = (grade) => {
    switch (grade) {
      case "green": return "Easy";
      case "red": return "Hard";
      case "yellow": return "Medium";
      default: return "bg-gray-500";
    }
  };

  const gotoNotes = (id, e) => {
    e.preventDefault();
    localStorage.setItem("noteid", id);
    navigate("/notes");
  };

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-full px-3 sm:px-6 py-4 bg-[#1F1D1D] text-white overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">📁 Your Directories</h2>
      </div>

      <div className="space-y-4 min-w-[240px]">
        {dirdata?.map((dir, index) => (
          <div key={dir._id} className="bg-[#2C2C2C] rounded-lg p-5 shadow-md">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className={`w-4 h-4 rounded ${getGradeColorClass(dir.grade)}`} />
                <div>
                  <p className="text-xl font-semibold">{dir.Dirname}</p>
                  <p className="text-sm text-gray-400">{dir.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-5 items-center">
                <button
                  className="text-xs sm:text-sm bg-blue-700 hover:bg-blue-800 px-2 sm:px-3 py-1 rounded-md"
                  onClick={() => setShowFormIndex(showFormIndex === index ? null : index)}
                >
                  {showFormIndex === index ? "Close" : "+ Add Note"}
                </button>
                <button onClick={() => Deldir(dir._id)} className="hover:text-red-500">
                  <FaTrash />
                </button>
                <button onClick={() => getnotes(dir._id)}>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      openDir === dir._id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {showFormIndex === index && (
              <form
                onSubmit={(e) => setNotes(dir._id, e)}
                className="mt-4 bg-[#1c1c1c] p-4 rounded-md space-y-3"
              >
                <input
                  name="heading"
                  placeholder="Heading"
                  className="w-full px-3 py-2 bg-[#2d2d2d] rounded text-white"
                />
                <textarea
                  name="desc"
                  placeholder="Description"
                  rows={3}
                  className="w-full px-3 py-2 bg-[#2d2d2d] rounded text-white"
                />
                <div className="flex gap-4 text-sm">
                  {["green", "red", "yellow"].map((color) => (
                    <label key={color} className="flex items-center gap-1">
                      <div className={`w-6 h-4 rounded-sm ${getGradeColorClass(color)}`}></div>
                      <input type="radio" name="grade" value={color} required />
                      {getGrade(color)}
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Add Note
                </button>
              </form>
            )}

            {openDir === dir._id && notesMap[dir._id]?.length > 0 && (
  <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {notesMap[dir._id].map((note) => (
                  <div
                    key={note._id}
                    className="flex items-start bg-[#3A3A3A] p-3 rounded-md hover:bg-[#444] transition-all cursor-pointer"
                  >
                    <div className="mr-4 mt-1">
                      <span
                        className={`w-3 h-3 rounded block ${getGradeColorClass(note.grade)}`}
                      ></span>
                    </div>

                    <div className="flex flex-col w-full" onClick={(e) => gotoNotes(note._id, e)}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm sm:text-base text-white">{note.heading}</span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm">{note.desc}</p>
                    </div>

                    <div className="flex gap-3 items-center ml-4">
                      <button
                        className="text-red-400 hover:text-red-500"
                        onClick={() => Delnotes(note._id, dir._id)}
                      >
                        <FaTrash size={16} />
                      </button>
                      <FaArrowRight className="text-lg rotate-90" />
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
