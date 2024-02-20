import React from "react";
import Container from "./Container";
import CategoryBox from "./CategoryBox";
import { TbBeach } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing } from "react-icons/gi";
import { TbMountain, TbPool } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import { useSearchParams } from "next/navigation";

const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const categoryOnUrl = params.get("category");
  
  return (
    <Container>
      <div className="flex items-center pt-2 pb-1 gap-1 justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={category.label === categoryOnUrl}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
