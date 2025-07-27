import axios from 'axios';

const API = import.meta.env.VITE_API_URL; // ✅ backend base URL

export default async function Delete(name, id) {
  console.log("delete is called");

  try {
    if (name === "post") {
      await axios.delete(`${API}/apii/post/postid/${id}`);
      console.log("post deleted");
      return;
    }

    if (name === "notes") {
      await axios.delete(`${API}/apii/notes/dirdelete/${id}`,{withCredentials:true});
      console.log("note deleted", id);
      return;
    }

    if (name === "dir") {
      await axios.delete(`${API}/apii/dir/${id}`);
      console.log("dir", id);
      return;
    }

    if (name === "noteid") {
      await axios.delete(`${API}/apii/notes/${id}`);
      console.log("noteid", id);
      return;
    }

    if (name === "content") {
      console.log(id);
      await axios.delete(`${API}/apii/notes/Notes/${id[0]}/content/${id[1]}`);
      console.log("content", id);
      return;
    }

  } catch (e) {
    console.log("delete..error", e);
  }
}
