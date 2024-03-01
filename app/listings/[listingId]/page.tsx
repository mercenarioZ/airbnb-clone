import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import Client from "@/app/components/Client";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/components/ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <Client>
        <EmptyState />
      </Client>
    );
  }

  return (
    <div>
      <Client>
        <ListingClient
          listing={listing}
          currentUser={currentUser}
          reservation={reservations}
        />
      </Client>
    </div>
  );
};

export default ListingPage;
