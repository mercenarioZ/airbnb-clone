"use client";

import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import useLoginModal from "../hooks/useLoginModal";
import { categories } from "./Categories";
import Container from "./Container";
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: Listing & {
    user: User;
  };
  reservation?: Reservation[];
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  // default value to use method like map, filter, reduce,...
  reservation = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  /**
   * Returns an array of dates that are disabled.
   * @returns {Date[]} - Array of dates that are disabled.
   *
   * @description The `disabledDates` function calculates and returns an array of dates that are disabled based on the reservations for the listing. It iterates over the `reservation` array and for each reservation, it calculates the range of dates between the start and end dates using the `eachDayOfInterval` function from the `date-fns` library. The calculated dates are then added to the `dates` array. Finally, the `dates` array is returned.
   */
  const disabledDates = () => {
    let dates: Date[] = [];

    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  };

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reservation created successfully!");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to create reservation");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = Math.floor(
        // explain: 86400000 = 24 * 60 * 60 * 1000
        (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / 86400000
      );

      // const days = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (days && listing.price) {
        setTotalPrice(days * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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

            <div className="order-first mb-10 md:order-last md:col-span-2">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates()}
                dateRange={dateRange}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
