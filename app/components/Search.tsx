import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import useSearchModal from "../hooks/useSearchModal";
import useCountries from "../hooks/useCountries";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  const locationLabel = () => {
    if (locationValue) {
      const country = getByValue(locationValue);
      return country?.label;
    }

    return "Location";
  };

  const timeLabel = () => {
    if (startDate && endDate) {
      let diff = differenceInDays(new Date(endDate), new Date(startDate));

      if (diff === 0) diff = 1;

      return `${diff} night${diff > 1 ? "s" : ""}`
    }

    return "Time";
  };

  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-lg transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6 border-r-[1px]">
          {timeLabel()}
        </div>

        <div className="hidden md:block text-sm font-semibold px-4 border-l-[1px] text-center">
          {locationLabel()}
        </div>

        <div className="text-sm pr-2 text-gray-600 flex items-center gap-3">
          {/* <div className="hidden sm:block">Add guests</div> */}

          <div className="p-2 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition">
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
