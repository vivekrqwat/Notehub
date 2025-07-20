import { useState } from "react";
import { UserStore } from "../store/Userstroe";
import DirectoryForm from "./FormComponent";

// pages/HomePage.jsx
export default function HomePage() {
  // const [show, setShow] = useState(false);
  const { user } = UserStore();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1C1C1C] p-4">
      {showForm ? (
        <DirectoryForm handleClose={() => setShowForm(false)} />
        ) :
      <div className="w-full max-w-md border-2 border-dashed border-white p-6 sm:p-10 rounded-lg text-center">
         
          <>
            <h1 className="text-xl sm:text-2xl font-bold mb-6 text-white">
              WELCOME BACK{" "}
              <span className="text-[#FFA500]">{user?.username || "User"}</span>!
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
            >
              Create directory
            </button>
          </>
       
      </div>}
    </div>
  );
}
