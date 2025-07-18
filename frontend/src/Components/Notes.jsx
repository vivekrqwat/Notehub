import React, { useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    desc: '',
    grade: '',
    image: null,
    imageUrl: ''
  });

  const handleAddNote = () => {
    setNotes([...notes, formData]);
    setFormData({ heading: '', desc: '', grade: '', image: null, imageUrl: '' });
    setShowForm(false);
  };

  const gradeColors = {
    yellow: '#facc15',
    green: '#22c55e',
    red: '#ef4444'
  };

  return (
    <div className="min-h-screen bg-[#1F1D1D] text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">MCA/@WEB_DEV</h1>
          <button
            className="bg-[#facc15] text-black px-4 py-2 rounded-xl font-semibold text-sm sm:text-base"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close' : 'Add'}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#2a2a2a] p-4 rounded-xl mb-6 w-full sm:min-w-[55%]">
            <input
              type="text"
              placeholder="@write Heading"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            />
            <textarea
              placeholder="@write your notes"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            />
            <input
              type="file"
              className="mb-2"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
            <input
              type="text"
              placeholder="Optional image URL"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <div className="flex items-center gap-3 mb-3">
              {['yellow', 'green', 'red'].map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-md cursor-pointer"
                  style={{ backgroundColor: gradeColors[color] }}
                  onClick={() => setFormData({ ...formData, grade: color })}
                />
              ))}
            </div>
            <button
              className="bg-[#22c55e] px-4 py-2 rounded-xl text-white font-semibold w-full sm:w-auto"
              onClick={handleAddNote}
            >
              Save
            </button>
          </div>
        )}

        <div className="space-y-4">
          {notes.map((note, idx) => (
            <div key={idx} className="bg-[#2a2a2a] p-4 rounded-xl w-full">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded-md"
                  style={{ backgroundColor: gradeColors[note.grade] || 'gray' }}
                ></div>
                <h2 className="font-bold capitalize">{note.heading}</h2>
              </div>
              <p className="text-sm mb-2 text-gray-200">{note.desc}</p>
              {note.image && (
                <img
                  src={URL.createObjectURL(note.image)}
                  alt="note-img"
                  className="rounded-md w-full max-w-xs mb-2"
                />
              )}
              {note.imageUrl && (
                <img
                  src={note.imageUrl}
                  alt="note-url-img"
                  className="rounded-md w-full max-w-xs"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
