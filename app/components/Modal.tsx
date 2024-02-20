"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleModalClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    // this delay is to allow the modal to animate out
    setTimeout(() => {
      onClose();
    }, 350);
  }, [disabled, onClose]);

  const handleModalSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <div>
      {/* modal background */}
      <div className="flex justify-center items-center z-50 fixed overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-600/70 inset-0">
        {/* modal container */}
        <div className="relative w-full md:w-4/6 lg:w-3/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* modal content */}
          <div
            className={`translate transition duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative translate h-full md:h-auto border-0 rounded-md shadow-lg bg-white flex flex-col w-full outline-none focus:outline-none">
              {/* header */}
              <div className="flex justify-center items-center p-3 rounded-t relative border-b-[1px]">
                <button
                  onClick={handleModalClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute right-5"
                >
                  <IoMdClose size={20} />
                </button>

                <div className="text-xl font-bold">{title}</div>
              </div>

              {/* body */}
              <div className="relative p-6 flex-auto">{body}</div>

              {/* footer */}
              <div className="flex flex-col p-6 pt-2 gap-2">
                <div className="flex items-center gap-4 w-full">
                  {/* secondary button */}
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}

                  {/* main button */}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleModalSubmit}
                  />
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
