import axios from "axios";
import { useState, useEffect } from "react";

// components/Discussion.jsx
export default function Discussion() {
  const [post, setPost] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const postfetch = async () => {
      try {
        const res = await axios.get("/api/post/");
        setPost(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    postfetch();
  }, []);

  const handleSend = () => {
    console.log("Message:", message);
    console.log("Image:", image);
    setMessage("");
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="relative h-full w-full bg-[#1F1D1D] rounded-md p-4">
      {/* Scrollable Chat Area */}
      <div className="overflow-y-auto h-full pb-24 space-y-4">
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
            <p className="text-gray-200 text-xs leading-relaxed">
              <span className="font-medium">{post.title}</span> {post.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Bar (stays inside the box) */}
      <div className="absolute bottom-4 left-4 right-4 bg-[#1F1D1D]">
        <div className="flex items-center gap-2">
          {/* Upload */}
          <label className="cursor-pointer text-white bg-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-600">
            📷
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Message Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="@type message"
            className="flex-1 px-4 py-2 rounded-md border-none bg-[#F1F1F1] text-black placeholder:text-gray-500"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>

        {image && (
          <div className="text-white text-xs mt-1 ml-1">Selected: {image.name}</div>
        )}
      </div>
    </div>
  );
}
