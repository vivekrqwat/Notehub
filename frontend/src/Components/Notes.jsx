import React, { useEffect, useState } from 'react';
import { UserStore } from '../store/Userstroe';
import axios from 'axios';
import Upload from '../utils/Upload';

export default function Notes() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    desc: '',
    grade: '',
    image: null,
    imageUrl: ''
  });

  const [notedata, setnotedata] = useState();
  const [loading, setloading] = useState(false);
  const { noteid, setnoteid } = UserStore();

  const fetchnote = async () => {
    try {
      const res = await axios.get(`/apii/notes/all/${noteid}`);
      setnotedata(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let Img = await Upload(formData.image);

      const noteToAdd = {
        heading: formData.heading,
        desc: formData.desc,
        grade: formData.grade,
        img: Img,
      };

      const data = {
        content: [...(notedata?.content || []), noteToAdd],
      };

      const res = await axios.put(`/apii/notes/${noteid}`, data);
      setnotedata(res.data);

      setFormData({ heading: '', desc: '', grade: '', image: null, imageUrl: '' });
      setShowForm(false);
      fetchnote();
    } catch (err) {
      console.error("Error saving note", err);
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

  useEffect(() => {
    fetchnote();
  }, []);

  if (loading) return <div>LOADING</div>;

  return (
    <div className="min-h-screen bg-[#1F1D1D] text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">{notedata?.heading}</h1>
          <button
            className="bg-[#facc15] text-black px-4 py-2 rounded-xl font-semibold text-sm sm:text-base"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close' : 'Add'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            className="bg-[#2a2a2a] p-4 rounded-xl mb-6 w-full sm:min-w-[55%]"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="@write Heading"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              name="heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              required
            />
            <textarea
              placeholder="@write your notes"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              name="desc"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              required
            />
            <input
              type="file"
              name="image"
              className="mb-2"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
            <input
              type="text"
              placeholder="Optional image URL"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <div className="flex items-center gap-3 mb-3">
              {['yellow', 'green', 'red'].map((color) => (
                <div
                  key={color}
                  name="grade"
                  className={`w-6 h-6 rounded-md cursor-pointer ${getGradeColorClass(color)}`}
                  onClick={() => setFormData({ ...formData, grade: color })}
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-[#22c55e] px-4 py-2 rounded-xl text-white font-semibold w-full sm:w-auto"
            >
              Save
            </button>
          </form>
        )}

        {/* Scrollable Notes List */}
        <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
          {notedata?.content?.map((note, idx) => (
            <div key={idx} className="bg-[#2a2a2a] p-4 rounded-xl w-full">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-md ${getGradeColorClass(note.grade)}`}></div>
                <h2 className="font-bold capitalize">{note.heading}</h2>
              </div>
              <p className="text-sm mb-2 text-gray-200">{note.desc}</p>
              {note.img && (
                <img
                  src={note.img}
                  alt="note-img"
                  className="rounded-md w-full max-w-xs mb-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
