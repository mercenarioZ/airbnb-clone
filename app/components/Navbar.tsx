"use client";

import Container from "./Container";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed z-10 shadow-sm w-full bg-white">
      <div className="py-4 border-b-2">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            Logo
            {/* <Logo /> */}
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
