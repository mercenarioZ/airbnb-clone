"use client";

import { Range } from "react-date-range";
import Calendar from "./Calendar";
import Button from "./Button";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-2 p-4">
        <div className="text-2xl font-semibold">${price}</div>

        <div className="text-neutral-500">night</div>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className="p-3">
        <Button label="Book now" onClick={onSubmit} />
      </div>

      <hr />

      <div className="flex gap-2 justify-between items-center p-2 font-semibold text-lg">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
