import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1F1D1D] text-white">
      <div className="flex flex-col items-center space-y-6 border-2 border-dashed border-white px-12 py-10 rounded-2xl">
        <div className="text-2xl font-bold tracking-wide animate-pulse">
          LOADING YOUR NOTE_HUB...
        </div>
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
