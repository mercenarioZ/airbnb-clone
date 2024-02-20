"use client";

import { User } from "@prisma/client";
import Container from "./Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // console.log({ currentUser });
  return (
    <div className="fixed z-10 shadow-md w-full bg-white">
      <div className="py-4 border-b-2">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            Logo
            {/* <Logo /> */}
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
};

export default Navbar;
