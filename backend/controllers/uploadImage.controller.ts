import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Image from "../models/uploadImage.model";
import { Request, Response } from "express";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const handleUploadImageController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        success: false,
        message: "Image not found!",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    console.log(result);

    await Image.create({
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    return res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

export default handleUploadImageController;
