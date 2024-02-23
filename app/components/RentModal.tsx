"use client";

import { useMemo, useState } from "react";
import useRentModal from "../hooks/useRentModal";
import { categories } from "./Categories";
import Heading from "./Heading";
import Modal from "./Modal";
import CategoryItem from "./CategoryItem";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import dynamic from "next/dynamic";
import Counter from "./Counter";
import ImageUpload from "./ImageUpload";

enum steps {
  category,
  location,
  info,
  images,
  description,
  price,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(steps.category);

  const onGoBack = () => {
    setStep((val) => val - 1);
  };

  const onGoNext = () => {
    setStep((val) => val + 1);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      imageSrc: "",
      description: "",
      price: "",
      title: "",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
    },
  });

  const watchedCategory = watch("category");
  const watchedLocation = watch("location");
  const watchedGuestCount = watch("guestCount");
  const watchedRoomCount = watch("roomCount");
  const watchedBathroomCount = watch("bathroomCount");

  const Map = useMemo(
    () => dynamic(() => import("./Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const customSetValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === steps.price) {
      return "OK";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === steps.category) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let body = (
    <div className="flex flex-col gap-5">
      <Heading
        title="What type of place are you wanting to rent?"
        subtitle="Select the category that best fits your property"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto max-h-[50vh]">
        {categories.map((category) => (
          <div
            key={category.label}
            className="col-span-1"
          >
            <CategoryItem
              icon={category.icon}
              onClick={(category) => {
                customSetValue("category", category);
              }}
              selected={watchedCategory === category.label}
              label={category.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Location
  if (step === steps.location) {
    body = (
      <div className="flex flex-col gap-3">
        <Heading
          title="Where is your property located?"
          subtitle="Enter the address of your property"
        />

        <CountrySelect
          value={watchedLocation}
          onChange={(value) => customSetValue("location", value)}
        />

        <Map center={watchedLocation?.latlng} />
      </div>
    );
  }

  // Step 3: Info
  if (step === steps.info) {
    body = (
      <div className="flex flex-col gap-3">
        <Heading
          title="Tell us more about your place"
          subtitle="Provide some basic information about your property"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={watchedGuestCount}
          onChange={(value) => customSetValue("guestCount", value)}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={watchedRoomCount}
          onChange={(value) => customSetValue("roomCount", value)}
        />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={watchedBathroomCount}
          onChange={(value) => customSetValue("bathroomCount", value)}
        />
      </div>
    );
  }

  // Step 4: Images
  if (step === steps.images) {
    body = (
      <div className="flex flex-col gap-3">
        <Heading
          title="Add some images"
          subtitle="Upload some images of your place"
        />

        <ImageUpload />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onGoNext}
      actionLabel={actionLabel}
      secondaryAction={step === steps.category ? undefined : onGoBack}
      secondaryActionLabel={secondaryActionLabel}
      body={body}
    />
  );
};

export default RentModal;
