"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";

interface ListingItemProps {
  data: Listing;
  currentUser: User | null;
  reservation?: Reservation;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
  onAction?: (id: string) => void;
}

const ListingItem: React.FC<ListingItemProps> = ({
  data,
  currentUser,
  reservation,
  actionLabel,
  actionId = "",
  disabled,
  onAction,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  // this is a helper function to get the location object from the country code
  const location = getByValue(data.locationValue);

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return;

    onAction && onAction(actionId);
  };

  const price = () => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  };

  const reservationDate = () => {
    if (!reservation) return null;

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  };

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 group cursor-pointer"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* image */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            className="object-cover w-full h-full group-hover:scale-105 transition"
            fill
            src={data.imageSrc}
            alt="image"
          />

          {/* heart button */}
          <div className="absolute top-5 right-5 text-white">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>

        {/* show the reservation date (if exists) || category */}
        <div className="font-light text-neutral-600">
          {reservationDate() || data.category}
        </div>

        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price()}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
