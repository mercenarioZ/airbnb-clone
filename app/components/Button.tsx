"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  small?: boolean;
  icon?: IconType;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label = "My Button",
  onClick,
  disabled,
  small,
  icon: Icon,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-85 transition w-full
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-2 px-1 mx-3" : "py-3 px-5"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="absolute left-4"
        />
      )}

      {label}
    </button>
  );
};

export default Button;
