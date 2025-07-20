import React, { useState } from "react";

export default function Collaborative() {
  const [createRoomData, setCreateRoomData] = useState({
    directoryName: "",
    description: "",
  });

  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateChange = (e) => {
    setCreateRoomData({ ...createRoomData, [e.target.name]: e.target.value });
  };

  const handleJoinChange = (e) => {
    setJoinRoomId(e.target.value);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    console.log("Creating Room with:", createRoomData);
    // Reset
    setCreateRoomData({ directoryName: "", description: "" });
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    console.log("Joining Room:", joinRoomId);
    // Reset
    setJoinRoomId("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1e1e1e] text-white px-4">
      <div className="border-4 border-dashed p-8 rounded-xl w-full max-w-md bg-[#2e2e2e]">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <h2 className="text-center text-2xl font-bold">Create collaboration</h2>

          <input
            type="text"
            name="directoryName"
            placeholder="@enter directory name"
            value={createRoomData.directoryName}
            onChange={handleCreateChange}
            className="w-full p-2 rounded bg-[#3b3b3b] text-white placeholder-gray-400"
            required
          />

          <textarea
            name="description"
            placeholder="Enter description..."
            value={createRoomData.description}
            onChange={handleCreateChange}
            className="w-full p-2 rounded bg-[#3b3b3b] text-white placeholder-gray-400"
            rows={3}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Create room
          </button>
        </form>

        <div className="text-center my-4 text-gray-400">OR</div>

        <form onSubmit={handleJoinSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="@Enter room id"
            value={joinRoomId}
            onChange={handleJoinChange}
            className="w-full p-2 rounded bg-[#3b3b3b] text-white placeholder-gray-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#FFA500] hover:bg-[#FFA501] text-white py-2 rounded"
          >
            Join room
          </button>
        </form>
      </div>
    </div>
  );
}
