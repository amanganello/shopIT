
import React from "react";
import { Eye } from "lucide-react";

export default function ViewMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="bg-white text-black w-80 flex items-center justify-center gap-2 px-6 py-2 shadow border border-gray-300 hover:bg-gray-100 transition font-extrabold cursor-pointer"
      style={{ borderRadius: '0.75rem' }}
      onClick={onClick}
    >
      <Eye className="w-5 h-5 text-gray-700 font-extrabold" />
      View More
    </button>
  );
}
