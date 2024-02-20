"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label?: string;
  icon?: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const handleCategoryClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleCategoryClick}
      className={`
      flex flex-col transition items-center w-full gap-1 justify-center cursor-pointer border-b-2

      ${
        selected
          ? "text-rose-500 border-rose-500"
          : "text-neutral-600 border-transparent hover:border-neutral-300"
      }
    `}
    >
      {Icon && <Icon size={20} />}
      <div>{label}</div>
    </div>
  );
};

export default CategoryBox;
