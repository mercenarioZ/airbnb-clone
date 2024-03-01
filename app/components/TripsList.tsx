"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SafeReservation } from "../types/types";
import Container from "./Container";
import Heading from "./Heading";
import ListingItem from "./ListingItem";
import axios from "axios";
import toast from "react-hot-toast";

interface TripsListProps {
  reservations: SafeReservation[];
  currentUser: User | null;
}

const TripsList: React.FC<TripsListProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const handleCancel = (id: string) => {
    setDeleteId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        router.refresh();
        toast.success("Reservation cancelled");
      })
      .catch(() => {
        toast.error("Failed to cancel reservation");
      })
      .finally(() => setDeleteId(""));
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Your trips will appear here"
      />

      <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {reservations.map((reservation) => {
          return (
            <ListingItem
              key={reservation.id}
              reservation={reservation}
              actionId={reservation.id}
              onAction={handleCancel}
              currentUser={currentUser}
              disabled={deleteId === reservation.id}
              actionLabel="Cancel"
              data={reservation.listing}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsList;
