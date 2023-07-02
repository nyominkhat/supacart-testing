"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { BsTrash, BsImage } from "react-icons/bs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUploadImage from "@/hooks/useUploadImage";

interface FormData {
  images: Blob[];
}

const BookSchema = yup.object({
  images: yup.mixed().required("A file is required"),
});

export default function ImageUploadClient() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BookSchema),
  });

  const images: Blob[] = watch("images") as Blob[];

  const { mutate, isLoading } = useUploadImage();

  function handleRemoveImage() {
    setValue("images", []);
  }

  const onSubmit = handleSubmit((data) => {
    mutate(data.images[0]);
  });

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="relative">
        <input
          type="file"
          id="image"
          className="absolute hidden "
          {...register("images")}
        />
        {images?.[0] ? (
          <div className="relative grid w-full border border-dashed rounded-lg place-items-center border-slate-900">
            <button
              className="absolute p-2 bg-red-200 rounded-md top-4 right-4 hover:bg-red-300"
              type="button"
              onClick={handleRemoveImage}
            >
              <BsTrash className="text-lg text-red-700" />
            </button>
            <img
              src={URL.createObjectURL(images?.[0])}
              alt="testImage"
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <label
            htmlFor="image"
            className="w-full  border border-dashed flex justify-center gap-4 items-center  border-slate-900 h-[15rem]   rounded-lg "
          >
            <BsImage className="text-[#8C8C8C] text-2xl " />
            <span className="text-sm text-dreamLabColor1">Upload a image</span>
          </label>
        )}
      </fieldset>
      {errors.images ? (
        <p className="mt-4 text-red-600">{errors.images.message}</p>
      ) : null}
      <div className="flex justify-center">
        <button
          className="px-4 py-2 mt-8 text-white rounded-md bg-slate-900 disabled:bg-slate-100"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
}
