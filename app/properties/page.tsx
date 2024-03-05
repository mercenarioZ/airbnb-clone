import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import Client from "../components/Client";
import EmptyState from "../components/EmptyState";
import PropertiesList from "../components/PropertiesList";

const Properties = async () => {
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

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <Client>
        <EmptyState
          title="No properties found!"
          subtitle="Please check back later."
        />
      </Client>
    );
  }

  return (
    <Client>
      <PropertiesList
        listings={listings}
        currentUser={currentUser}
      />
    </Client>
  );
};

export default Properties;
