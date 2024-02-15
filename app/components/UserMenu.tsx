"use client";

import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";

const UserMenu = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold rounded-full hover:bg-neutral-100 transition px-4 cursor-pointer py-3"
        >
          Airbnb
        </div>

        {/* Menu icon and avatar */}
        <div className="p-4 md:py-1 md:px-3 border-[1px] border-neutral-200 flex items-center gap-2 rounded-full cursor-pointer transition hover:shadow-md">
          <AiOutlineMenu />

          {/* Avatar */}
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
