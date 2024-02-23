"use client";

import { useMemo, useState } from "react";
import useRentModal from "../hooks/useRentModal";
import { categories } from "./Categories";
import Heading from "./Heading";
import Modal from "./Modal";
import CategoryItem from "./CategoryItem";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import Map from "./Map";

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
      location: "",
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

  // Location step
  if (step === steps.location) {
    body = (
      <div>
        <Heading
          title="Where is your property located?"
          subtitle="Enter the address of your property"
        />

        <CountrySelect
          value={watchedLocation}
          onChange={(value) => customSetValue("location", value)}
        />

        <Map />
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
