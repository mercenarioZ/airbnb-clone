import { Listing, Reservation } from "@prisma/client";

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  listing: Listing;
};
