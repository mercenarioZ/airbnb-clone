"use client";

import { Listing, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Container from "./Container";
import Heading from "./Heading";
import ListingItem from "./ListingItem";

interface PropertiesListProps {
  listings: Listing[];
  currentUser: User | null;
}

const PropertiesList: React.FC<PropertiesListProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const handleDelete = (id: string) => {
    setDeleteId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted successfully!");

        router.refresh();
      })
      .catch(() => {
        toast.error("Failed!");
      })
      .finally(() => setDeleteId(""));
  };

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="Manage your properties here."
      />

      <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {listings.map((listing) => {
          return (
            <ListingItem
              key={listing.id}
              actionId={listing.id}
              onAction={handleDelete}
              currentUser={currentUser}
              disabled={deleteId === listing.id}
              actionLabel="Delete this listing"
              data={listing}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesList;
