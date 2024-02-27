import { User } from "@prisma/client";
import axios from "axios";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IProps {
  listingId: string;
  currentUser: User | null;
}

const useFavorites = ({ listingId, currentUser }: IProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const isFavorited = (): boolean => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  };

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click from propagating to the parent element
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      if (isFavorited()) {
        await axios.delete(`/api/favorites/${listingId}`);
        toast.success("Removed from favorites");
      } else {
        await axios.post(`/api/favorites/${listingId}`);
        toast.success("Added to favorites");
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { isFavorited, toggleFavorite };
};

export default useFavorites;
