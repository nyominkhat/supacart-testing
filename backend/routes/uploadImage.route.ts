import express from "express";
import upload from "../middlewares/cloudinaryupload";
import handleUploadImageController from "../controllers/uploadImage.controller";
import createImageFolderPath from "../middlewares/createImageFolderPath";

const uploadImageRoutes = express.Router();

uploadImageRoutes.post(
  "/",
  upload.single("image"),
  createImageFolderPath,
  handleUploadImageController
);

export default uploadImageRoutes;
