"use client";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form className="flex items-center w-[32rem] bg-white rounded-full shadow px-4 py-2">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-base"
      />
      <Search className="w-5 h-5 text-gray-500 ml-2" />
    </form>
  );
}
