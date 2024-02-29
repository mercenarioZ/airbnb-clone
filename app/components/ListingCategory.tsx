"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  description?: string;
  label: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  description,
  label,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <Icon size={46} className="text-neutral-800/80" />
        <div className="flex flex-col">
          <div className="font-semibold">{label}</div>
          <div className="text-neutral-500">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
