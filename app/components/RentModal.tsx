"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useRentModal from "../hooks/useRentModal";
import { categories } from "./Categories";
import CategoryItem from "./CategoryItem";
import Counter from "./Counter";
import CountrySelect from "./CountrySelect";
import Heading from "./Heading";
import ImageUpload from "./ImageUpload";
import Input from "./Input";
import Modal from "./Modal";

enum steps {
  category,
  location,
  info,
  images,
  description,
  price,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(steps.category);

  const [isLoading, setIsLoading] = useState(false);

  const onGoBack = () => {
    setStep((val) => val - 1);
  };

  const onGoNext = () => {
    setStep((val) => val + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    if (step !== steps.price) {
      return onGoNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Your property has been listed!");

        router.refresh();

        // reset the entire form
        reset();
        setStep(steps.category);

        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong...");
      })
      .finally(() => setIsLoading(false));
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
      price: 1,
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
  const watchedImageSrc = watch("imageSrc");

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

        <ImageUpload
          value={watchedImageSrc}
          onChange={(value) => customSetValue("imageSrc", value)}
        />
      </div>
    );
  }

  // Step 5: Description
  if (step === steps.description) {
    body = (
      <div className="flex flex-col gap-3">
        <Heading
          title="Describe your place"
          subtitle="Provide a brief description of your property"
        />

        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          required
          disabled={isLoading}
        />

        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
          required
          disabled={isLoading}
        />
      </div>
    );
  }

  // Step 6: Price
  if (step === steps.price) {
    body = (
      <div className="flex flex-col gap-3">
        <Heading
          title="Set the price"
          subtitle="How much do you want to charge for your property?"
        />

        <Input
          id="price"
          label="Price (USD per night)"
          type="number"
          register={register}
          errors={errors}
          required
          disabled={isLoading}
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === steps.category ? undefined : onGoBack}
      secondaryActionLabel={secondaryActionLabel}
      body={body}
    />
  );
};

export default RentModal;
