"use client";

import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      className={`
        rounded-xl border-4 p-4 flex flex-col gap-2 hover:border-rose-500 cursor-pointer transition mx-3

        ${selected && "border-rose-500"}
      `}
      onClick={() => onClick(label)}
    >
      <Icon size={20} />

      <div>{label}</div>
    </div>
  );
};

export default CategoryItem;
