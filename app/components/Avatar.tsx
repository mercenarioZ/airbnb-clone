"use client";

import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      height={30}
      width={30}
      alt="avatar"
      className="rounded-full"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
