"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="o6iuwsu6"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative cursor-pointer transition hover:opacity-80 border-dashed p-16 border-2 border-neutral-600 rounded-md flex items-center justify-center flex-col gap-4"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={36} />

            <div>Click to upload your image</div>

            {/* if there is a image, show it */}
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  fill
                  src={value}
                  alt="image"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
