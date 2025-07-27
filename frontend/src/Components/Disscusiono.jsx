import axios from "axios";
import { useState, useEffect } from "react";
import { UserStore } from "../store/Userstroe";
import Upload from "../utils/Upload";
// import { API } from "../utils/API";
const API = import.meta.env.VITE_API_URL;
export default function Discussion() {
  const [post, setPost] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();
  const [loading, setloading] = useState(false);
  const { user } = UserStore();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/apii/post/`);
      setPost(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSend = async () => {
    try {
      let imgUrl = "";
      setloading(true);
      imgUrl = await Upload(image);
      console.log("url", imgUrl);

      const postdata = {
        uid:"",
        username: user.username,
        email: user?.email,
        desc: message,
        img: imgUrl,
      };

      await axios.post(`${API}/apii/post/`, postdata,{
        withCredentials: true
      });
      setMessage("");
      setImage(null);
      fetchPosts();
    } catch (e) {
      console.log("Post error:", e);
    } finally {
      setloading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="h-[calc(100vh-100px)] w-full bg-[#1F1D1D] rounded-md p-4 flex flex-col overflow-hidden">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
          <p className="text-sm text-gray-300">Uploading your post...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {post.map((post) => (
            <div
              key={post._id}
              className="bg-[#2C2C2C] rounded-lg px-4 py-3 text-sm text-white shadow"
            >
              <div className="flex items-center mb-1 gap-2">
                <div className="w-7 h-7 bg-gray-500 rounded-full" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{post.username}</span>
                  <span className="text-xs text-gray-400">{post.email}</span>
                </div>
              </div>
              <p className="text-gray-200 text-xs leading-relaxed">{post.desc}</p>
              {post.img && (
                <img
                  src={post.img}
                  className="w-[80%] max-h-[400px] mx-auto mt-2 rounded-md object-contain"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Input Box */}
      <div className="bg-[#2A2A2A] mt-2 px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <label className="cursor-pointer text-white bg-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-600">
            📷
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <input
            type="text"
            name="desc"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="@type message"
            className="flex-1 px-4 py-2 rounded-md border-none bg-[#F1F1F1] text-black placeholder:text-gray-500"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
