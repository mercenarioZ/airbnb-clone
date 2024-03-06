"use client";

import Modal from "./Modal";
import useSearchModal from "../hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "./CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "./Heading";
import Calendar from "./Calendar";
import Counter from "./Counter";

enum steps {
  location,
  date,
  info,
}

const SearchModal = () => {
  const { isOpen, onClose } = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(steps.location);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onGoBack = () => {
    setStep((value) => value - 1);
  };

  const onGoNext = () => {
    setStep((value) => value + 1);
  };

  const Map = useMemo(
    () => dynamic(() => import("./Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onSubmit = () => {
    if (step !== steps.info) return onGoNext();

    let query = {};

    if (params) {
      query = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(steps.location);
    onClose();

    // this will apply the query to the URL
    router.push(url);
  };

  const actionLabel = () => {
    if (step === steps.info) return "Search";

    return "Next";
  };

  const secondaryActionLabel = () => {
    if (step === steps.location) return undefined;

    return "Back";
  };

  let body = (
    <div className="flex flex-col gap-6">
      <Heading
        title="What location are you interested in?"
        subtitle="Find your location"
      />

      <CountrySelect
        onChange={(value) => setLocation(value as CountrySelectValue)}
        value={location}
      />

      <hr />

      <Map center={location?.latlng} />
    </div>
  );

  if (step === steps.date) {
    body = (
      <div className="flex flex-col gap-6">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === steps.info) {
    body = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Detail information"
          subtitle="For the best results"
        />

        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />

        <hr />

        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />

        <hr />

        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    );
  }

  return (
    <Modal
      title="Search"
      actionLabel={actionLabel()}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      body={body}
      secondaryAction={step === steps.location ? undefined : onGoBack}
      secondaryActionLabel={secondaryActionLabel()}
    />
  );
};

export default SearchModal;
