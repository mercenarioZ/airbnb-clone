"use client";

import { User } from "@prisma/client";
import useCountries from "../hooks/useCountries";
import Heading from "./Heading";
import Image from "next/image";
import HeartButton from "./HeartButton";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  listingId: string;
  currentUser?: User | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  imageSrc,
  locationValue,
  listingId,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <div>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      {/* Image */}
      <div className="max-w-[70vw] rounded-xl relative overflow-hidden h-[60vh] xl:h-[67vh]">
        <Image
          fill
          src={imageSrc}
          alt="image"
          className="object-cover w-full"
        />

        <div className="absolute top-4 right-4">
          <HeartButton listingId={listingId} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
