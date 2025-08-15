import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Upload from '../utils/Upload';
import { FaTrash } from 'react-icons/fa';
import Delete from '../utils/Delete';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from './Speech.jsx';
import { UserStore } from '../store/Userstroe.jsx';
import CodeEditor from './CodeEditor.jsx';
import { toast } from 'react-toastify';


const API = import.meta.env.VITE_API_URL;

export default function Notes() {
  const [noteid, setNoteid] = useState(localStorage.getItem("noteid"));
  const [notedata, setNotedata] = useState();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [contentdata, setcontentdata] = useState([]);
  const [show, setShow] = useState(false);
  const [descvalue, setdescvalue] = useState("");
  const[editid,seteditid]=useState(null);
  const [formData, setFormData] = useState({
    heading: '',
    desc: '',
    grade: '',
    image: null,
    imageUrl: ''
  });
  const [showcode, setshowcode] = useState(false);
  const { user } = UserStore();
const edit=(idx)=>{
  seteditid(idx);
  setdescvalue(contentdata[idx]?.desc||" ");
}
const saveDesc = async (noteId) => {
  try {
    
    // Prepare updated content array
    const updatedContent = contentdata.map((item) =>
      item._id === noteId ? { ...item, desc: descvalue } : item
    );

    // Update backend
    await axios.put(
      `${API}/apii/notes/${noteid}`,
      { content: updatedContent },
      { withCredentials: true }
    );

    // Update frontend state
    setcontentdata(updatedContent);

    // Exit edit mode
    seteditid(null);
  } catch (error) {
    console.error("Error saving description:", error);
  }
};

 

  const fetchNote = async () => {
    if (!noteid) return;
    try {
      const res = await axios.get(`${API}/apii/notes/all/${noteid}`);
      setNotedata(res.data);
      setcontentdata(res.data.content);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  };
  const delnotes = async (id) => {
    try {
      await Delete("content", id);
      fetchNote();
      // setcontentdata((prv) => prv.filter((item) => item._id != id[1]));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let Img = await Upload(formData.image);
      const noteToAdd = {
        heading: formData.heading,
        desc: formData.desc,
        grade: formData.grade,
        code: formData.code,
        Approach: formData.Approach,
        img: Img,
      };
      const data = {
        content: [...(notedata?.content || []), noteToAdd],
      };
      const res = await axios.put(`${API}/apii/notes/${noteid}`, data,{withCredentials:true});
      const res2=await axios.post(`${API}/apii/user/submission/${user._id}`,{withCredentials:true});
      console.log("res2",res2.data);
      setNotedata(res.data);
      setFormData({ heading: '', desc: '', grade: '', image: null, imageUrl: '' });
      setShowForm(false);
      fetchNote();
    } catch (err) {
      console.error("Error saving note", err);
    } finally {
      setLoading(false);
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

  const handlecopy = async (code) => {
    await navigator.clipboard.writeText(code) 
  }

  useEffect(() => {
    if (noteid) {
      localStorage.setItem("noteid", noteid);
      fetchNote();
    }
  }, [noteid]);

  if (!noteid) return <div>No note selected</div>;
  if (loading) return <div>Loading...</div>;

  return (
   <div className="min-h-screen max-h-screen overflow-y-auto bg-[#1F1D1D] text-white p-4 sm:p-6">

      <div className="max-w-4xl mx-auto w-full">
        {show?<Speech setshow={setShow} desc={setFormData}></Speech>:null}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">{notedata?.heading}</h1>
          <button
            className="bg-[#facc15] text-black px-4 py-2 rounded-xl font-semibold text-sm sm:text-base"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close' : 'Add'}
          </button>
        </div>

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
              placeholder={showcode?"@write question":"@write description"}
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              name="desc"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              required
              rows={8}
            />
<button
  type="button"
  onClick={() => setshowcode((prev) => !prev)}
  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-xl font-semibold text-sm sm:text-base mb-4 transition duration-300"
>{showcode?"Printf":"write code"}</button>            {showcode && (
              <>
               <textarea
              placeholder="@write Approach"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              name="Approach"
              value={formData.Approach}
              onChange={(e) => setFormData({ ...formData, Approach: e.target.value })}
            rows={5}
            />
             <textarea
              placeholder="@write code"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              name="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            rows={7}
            />
            </>)}
            <input
              type="file"
              name="image"
              className="mb-2"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
           
            <div className="flex items-center gap-3 mb-3">
              {['yellow', 'green', 'red'].map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-md cursor-pointer ${getGradeColorClass(color)}`}
                  onClick={() => setFormData({ ...formData, grade: color })}
                />
              ))}
            </div>
           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:justify-start">
  <button
    type="submit"
    className="bg-[#22c55e] px-4 py-2 rounded-xl text-white font-semibold w-full sm:w-auto"
  >
    Save
  </button>

  <button
    type="button"
    onClick={() => setShow(true)}
    className="bg-[#22c55e] px-4 py-2 rounded-xl text-white font-semibold w-full sm:w-auto"
  >
    Audio to text
  </button>
</div>

            
          </form>
        )}

        <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
          {contentdata.map((note, idx) => (
            <div key={idx} className="bg-[#2a2a2a] p-4 rounded-xl w-full" onClick={()=>edit(idx)}>
              <div className="flex items-center gap-2 mb-2 justify-between">
                <div className="flex">
                  <div className={`w-4 h-4 rounded-md ${getGradeColorClass(note.grade)}`}></div>
                  <h2 className="font-bold capitalize ml-2 text-2xl">{note.heading}</h2>
                </div>
                <button className="text-red-400 hover:text-red-500" onClick={() => delnotes([noteid, note._id])}>
                  <FaTrash size={18} />
                </button>
              </div>
              {editid==idx ?
              <div onClick={(e) => e.stopPropagation()}>
               <textarea
              placeholder="@write code"
              className="w-full p-2 mb-2 rounded-md bg-[#1F1D1D] text-white"
              name="code"
              value={descvalue}
              onChange={(e) => setdescvalue(e.target.value)}
            rows={18}
            />
           <div className="flex gap-3 justify-end">
      <button
        onClick={() => saveDesc(note._id)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition duration-200"
      >
        Save
      </button>
    <button
  onClick={() => {
    
    seteditid(null);
  console.log("cancel",editid,idx);
  }
  }
  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-semibold transition duration-200"
>
  Cancel
</button>

    </div>
            </div>
              :
                  <p className="text-base mb-2 text-gray-200" style={{ whiteSpace: "pre-wrap", fontFamily: "Inter, system-ui, sans-serif", lineHeight: "1.6" }} >{note.desc}</p> }


<hr className="border-t border-gray-600 my-3" />
<p
  className="text-lg mb-2 text-gray-200"
  style={{
    whiteSpace: "pre-wrap",
    fontFamily: `"Inter", "Segoe UI", "Open Sans", "sans-serif"`,
    lineHeight: "1.8",
    fontSize: "16px"
  }}
>
  {note?.Approach}
</p>                {note.img && (
                <img
                  src={note.img}
                  alt="note-img"
                  className="rounded-md w-full max-w-xs mb-2"
                />
              )}
              {note.code && (<>
<button
  onClick={() => handlecopy(note.code)}
  className="bg-[#2D2D2D] text-white px-3 py-1.5 rounded text-xs hover:bg-[#444] transition duration-300 ml-auto"
>
  Copy
</button>
<hr className="border-t border-gray-600 my-3" />

                <CodeEditor cd={note.code}></CodeEditor>
                </>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
