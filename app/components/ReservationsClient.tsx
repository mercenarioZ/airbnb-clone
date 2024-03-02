"use client";

import { User } from "@prisma/client";
import { SafeReservation } from "../types/types";
import Container from "./Container";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingItem from "./ListingItem";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: User | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();

  // state for deleting a reservation
  const [deleteId, setDeleteId] = useState("");

  const handleCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          // display a success message
          toast.success("Reservation cancelled");
        })
        .catch(() => {
          // display an error message
          toast.error("Failed to cancel reservation");
        })
        .finally(() => {
          setDeleteId("");
          router.refresh();
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Manage your reservations on your property"
      />

      <div className="mt-8 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {reservations.map((reservation) => {
          return (
            <ListingItem
              key={reservation.id}
              data={reservation.listing}
              actionId={reservation.id}
              onAction={handleCancel}
              disabled={deleteId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser ?? null}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
