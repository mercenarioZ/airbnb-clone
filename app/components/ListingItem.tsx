interface ListingItemProps {
  title: string;
}

const ListingItem: React.FC<ListingItemProps> = ({ title }) => {
  return <div>{title}</div>;
};

export default ListingItem;
