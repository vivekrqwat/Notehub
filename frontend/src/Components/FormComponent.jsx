import axios from "axios";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { UserStore } from "../store/Userstroe";
import { useNavigate } from "react-router-dom";

export default function DirectoryForm({ handleClose }) {
  const initialData = {
    Dirname: "",
    desc: "",
    grade: "",
  };

  const { user } = UserStore();
  const [formData, setFormData] = useState(initialData);
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGradeSelect = (grade) => {
    setFormData((prev) => ({ ...prev, grade }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post("/apii/dir/", {
        uid: user._id,
        ...formData,
      });
      console.log(res.data);
      console.log('navigate');
      navigate("/dir")
    } catch (err) {
      console.log("dir ", err);
    }
    setFormData(initialData);
    handleClose();
  };

  const handleFormClose = () => {
    setFormData(initialData);
    handleClose();
  };

  return (
    <div className="relative bg-[#2C2C2C] text-white max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-md border border-gray-700">
      {/* Cross Icon */}
      <button
        onClick={handleFormClose}
        className="absolute top-2 right-2 text-white hover:text-red-400"
      >
        <IoMdClose size={22} />
      </button>

      <h2 className="text-white font-bold text-2xl sm:text-3xl mb-1">
        Please enter all the given data
      </h2>
      <p className="text-sm text-gray-300 italic mb-4">
        You don’t have to see the whole staircase, just take the first step
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold text-white mb-1">
            Enter directory name
          </label>
          <input
            type="text"
            name="Dirname"
            value={formData.Dirname}
            onChange={handleChange}
            placeholder="@enter directory name"
            className="w-full px-4 py-2 rounded-sm text-black outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-white mb-1">
            Enter description
          </label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows="4"
            placeholder="@Enter Description……"
            className="w-full px-4 py-2 rounded-sm text-black resize-none outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-2">Choose grade</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleGradeSelect("red")}
              className={`px-3 py-1 rounded-full text-white text-sm ${
                formData.grade === "red"
                  ? "bg-red-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Difficult
            </button>
            <button
              type="button"
              onClick={() => handleGradeSelect("yellow")}
              className={`px-3 py-1 rounded-full text-white text-sm ${
                formData.grade === "yellow"
                  ? "bg-yellow-500"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => handleGradeSelect("green")}
              className={`px-3 py-1 rounded-full text-white text-sm ${
                formData.grade === "green"
                  ? "bg-green-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Easy
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
