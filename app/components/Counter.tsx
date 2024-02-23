"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onSubtract = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium text-lg">{title}</div>

        <div className="text-neutral-600/80">{subtitle}</div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onSubtract}
          className="p-2 rounded-full h-8 w-8 transition flex items-center justify-center hover:bg-neutral-300/40 border-[1px] border-neutral-400"
        >
          <AiOutlineMinus />
        </button>

        <div>{value}</div>

        <button
          onClick={onAdd}
          className="p-2 rounded-full h-8 w-8 transition flex items-center justify-center hover:bg-neutral-300/40 border-[1px] border-neutral-400"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
