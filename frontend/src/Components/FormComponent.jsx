import axios from "axios";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { UserStore } from "../store/Userstroe";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function DirectoryForm({ handleClose }) {
  const initialData = {
    Dirname: "",
    desc: "",
    grade: "",
  };
  console.log(API)

  const { user } = UserStore();
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

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
      const res = await axios.post(`${API}/apii/dir`, {
        uid: user._id,
        ...formData,
      });
      console.log(res.data);
      navigate("/dir");
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
            {["red", "yellow", "green"].map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => handleGradeSelect(grade)}
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  formData.grade === grade
                    ? `bg-${grade}-600`
                    : `bg-${grade}-500 hover:bg-${grade}-600`
                }`}
              >
                {grade === "red"
                  ? "Difficult"
                  : grade === "yellow"
                  ? "Medium"
                  : "Easy"}
              </button>
            ))}
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
