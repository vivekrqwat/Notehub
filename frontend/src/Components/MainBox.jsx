// pages/HomePage.jsx
export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full max-w-md border-2 border-dashed border-white p-10 rounded-lg text-center">
        <h1 className="text-xl font-bold mb-4 text-white">
          WELCOME BACK <span className="text-pink-400">VIVEK</span>!
        </h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm mt-2">
          Create directory
        </button>
      </div>
    </div>
  );
}
