import { User } from "@prisma/client";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorites from "../hooks/useFavorites";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { isFavorited, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={30}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={26}
        className={isFavorited() ? "fill-rose-500" : "fill-neutral-500/60"}
      />
    </div>
  );
};

export default HeartButton;
