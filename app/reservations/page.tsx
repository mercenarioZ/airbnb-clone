import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Client from "../components/Client";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "../components/ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div>
        <EmptyState
          title="Unauthorized"
          subtitle="Login now"
        />
      </div>
    );
  }

  const reservations = await getReservations({
    hostId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Your property does not have any reservations"
        subtitle="Looks like you have no reservations yet."
      />
    );
  }

  return (
    <Client>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Client>
  );
};

export default ReservationsPage;
