import axios from 'axios';

const API = import.meta.env.VITE_API_URL; // <-- base backend URL

export default async function Upload(image) {
  let imgUrl = "";

  if (image) {
    try {
      const auth = await axios.get(`${API}/apii/upcheck/auth`);
      const res = auth.data;

      const formData = new FormData();
      formData.append("file", image);
      formData.append("fileName", image.name);
      formData.append("publicKey", "public_Zx6Z/z2NPa2fYBQ/1lfcMmmLLVI=");
      formData.append("signature", res.signature);
      formData.append("expire", res.expire);
      formData.append("token", res.token);
      formData.append("folder", "/post");

      const upload = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData
      );

      imgUrl = upload.data.url;
      console.log("Uploaded image URL:", imgUrl);
    } catch (err) {
      console.error("Image upload error:", err);
    }
  }

  return imgUrl;
}
