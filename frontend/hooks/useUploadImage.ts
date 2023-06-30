"use client";
import uploadImage from "@/services/uploadImage";
import { useMutation } from "@tanstack/react-query";

export default function useUploadImage() {
  return useMutation(uploadImage);
}
