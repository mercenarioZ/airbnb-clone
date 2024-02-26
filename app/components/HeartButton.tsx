import { User } from "@prisma/client";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  // const isFavorited = true;
  const toggleFavorited = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorited}
    >
      <AiOutlineHeart
        size={30}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={26}
        className={isFavorited ? "fill-rose-500" : "fill-neutral-500/60"}
      />
    </div>
  );
};

export default HeartButton;
