"use client";

import { User } from "@prisma/client";
import { IconType } from "react-icons";
import useCountries from "../hooks/useCountries";
import Avatar from "./Avatar";
import ListingCategory from "./ListingCategory";
import Map from "./Map";

interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 font-semibold text-lg items-center">
          <div>By {user.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex gap-3 text-neutral-500">
          <div>{guestCount} guest&#40;s&#41;</div>
          <div>{roomCount} room&#40;s&#41;</div>
          <div>{bathroomCount} bathroom&#40;s&#41;</div>
        </div>
      </div>
      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          description={category.description}
          label={category?.label}
        />
      )}

      <hr />

      <div>{description}</div>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
