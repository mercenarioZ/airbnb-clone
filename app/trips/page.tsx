import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Client from "../components/Client";
import EmptyState from "../components/EmptyState";
import TripsList from "../components/TripsList";

const Trips = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Client>
        <EmptyState
          title="Unauthorized!"
          subtitle="Please login"
        />
      </Client>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <Client>
        <EmptyState
          title="You have not made a reservation yet!"
          subtitle="Make a reservation and it will show up here."
        />
      </Client>
    );
  }

  return (
    <Client>
      <TripsList
        reservations={reservations}
        currentUser={currentUser}
      />
    </Client>
  );
};

export default Trips;
