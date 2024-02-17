import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">Search</div>

        <div className="hidden md:block text-sm font-semibold px-6 border-x-[1px] md:flex-1 text-center">
          test
        </div>

        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">Add guests</div>

          <div className="p-2 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition">
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
