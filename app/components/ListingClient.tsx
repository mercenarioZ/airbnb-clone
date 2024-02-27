"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "./Categories";
import Container from "./Container";
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
  listing: Listing & {
    user: User;
  };
  reservation?: Reservation[];
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservation,
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            listingId={listing.id}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-8 mt-6">
            <ListingInfo
              category={category}
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
