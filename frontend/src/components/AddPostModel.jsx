"use client";

import PropTypes from "prop-types";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

export default function AddPostModel({ isOpen, onClose, onSave }) {
  const fileRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCaptionError(null);
      setImageError(null);
    }
  }, [isOpen]);

  const [captionError, setCaptionError] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleSave = () => {
    const caption = captionRef.current.value;
    const image = fileRef.current.files[0];
    let isValid = true;
    if (caption?.trim() === "") {
      setCaptionError("Caption is required");
      isValid = false;
    } else if (caption?.trim().length > 250) {
      setCaptionError("Caption should be less than 250 characters");
      isValid = false;
    } else setCaptionError(null);

    if (!image) {
      setImageError("Image is required");
      isValid = false;
    } else if (image?.size > 5 * 1024 * 1024)
      setImageError("Image size should be less than 5MB");
    else setImageError(null);

    if (isValid) onSave({ caption, image });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 className="text-lg font-semibold text-gray-900">Add Post</h1>
              <div className="mt-4">
                <label
                  htmlFor="caption"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Caption
                </label>
                <textarea
                  id="caption"
                  name="caption"
                  rows="3"
                  ref={captionRef}
                  className="mt-1 block w-full p-2 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-red-600">{captionError}</p>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  ref={fileRef}
                  accept=".gif,.jpg,.jpeg,.png"
                  className="mt-1 block w-full p-2 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-red-600">{imageError}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Save
              </button>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

AddPostModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
