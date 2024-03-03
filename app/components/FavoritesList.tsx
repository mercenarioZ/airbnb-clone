import { Listing, User } from "@prisma/client";
import Client from "./Client";
import Container from "./Container";
import Heading from "./Heading";
import ListingItem from "./ListingItem";

interface FavoritesListProps {
  favListings: Listing[];
  currentUser?: User | null;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favListings,
  currentUser,
}) => {
  return (
    <Client>
      <Container>
        <Heading
          title="Your favorite listings"
          subtitle="Check out your top picks!"
        />

        <div className="mt-8 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {favListings.map((listing) => {
            return (
              <ListingItem
                key={listing.id}
                currentUser={currentUser ?? null}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </Client>
  );
};

export default FavoritesList;
