import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import Client from "./components/Client";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingItem from "./components/ListingItem";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <Client>
        <EmptyState showReset />
      </Client>
    );
  }

  return (
    <Client>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {listings.map((listing) => {
            return (
              <ListingItem
                currentUser={currentUser}
                data={listing}
                key={listing.id}
              />
            );
          })}
        </div>
      </Container>
    </Client>
  );
}

export default Home;