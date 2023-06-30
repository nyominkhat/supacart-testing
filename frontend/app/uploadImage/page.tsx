import React from "react";
import ImageUploadClient from "./ImageUploadClient";

export default function Page() {
  return (
    <main className="max-w-2xl py-10 mx-auto min-h-screen ">
      <h1 className="text-center text-2xl mb-10">Image Uploader</h1>
      <ImageUploadClient />
    </main>
  );
}
