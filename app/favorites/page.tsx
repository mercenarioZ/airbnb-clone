import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import Client from "../components/Client";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import FavoritesList from "../components/FavoritesList";
import Heading from "../components/Heading";
import ListingItem from "../components/ListingItem";

const FaroritesPage = async () => {
  const favListings = await getFavorites();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Client>
        <EmptyState
          title="Unauthenticated user"
          subtitle="Please sign in to view your favorite places"
        />
      </Client>
    );
  }

  if (!favListings.length) {
    return (
      <Client>
        <EmptyState
          title="No favorites"
          subtitle="Just simply click on the heart button, it will appear here"
        />
      </Client>
    );
  }

  return (
    <Client>
      <FavoritesList
        favListings={favListings}
        currentUser={currentUser}
      />
    </Client>
  );
};

export default FaroritesPage;
