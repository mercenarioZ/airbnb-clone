"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../hooks/useRegisterModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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
        <div
          onClick={toggleMenuOpen}
          className="p-4 md:py-1 md:px-3 border-[1px] border-neutral-200 flex items-center gap-2 rounded-full cursor-pointer transition hover:shadow-md"
        >
          <AiOutlineMenu />

          {/* Avatar */}
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {/* open the menu when isOpen state is true */}
      {isOpen && (
        <div className="absolute w-[30vw] md:w-3/4 rounded-xl bg-white shadow-md right-0 top-16 md:top-12 overflow-hidden">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="Login" />
              <MenuItem onClick={registerModal.onOpen}  label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
