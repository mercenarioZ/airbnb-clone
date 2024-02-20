import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  formatPrice,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={22}
          className="text-neutral-600"
        />
      )}

      <label className="text-zinc-700">{label}</label>

      <input
        disabled={disabled}
        id={id}
        {...register(id, { required })}
        type={type}
        className={`
          w-full p-3 mt-1 font-light bg-white border-[1px] rounded-md outline-none focus:border-black transition

          ${formatPrice ? "pl-8" : "pl-4"}
          ${errors[id] && "border-rose-500"}
          ${errors[id] && "focus:border-rose-500"}
        `}
      />
    </div>
  );
};

export default Input;
