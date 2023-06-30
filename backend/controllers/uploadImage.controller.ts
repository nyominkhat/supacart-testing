import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import dotenv from "dotenv";
import Image from "../models/uploadImage.model";
import { Request, Response } from "express";
import path from "path";
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

    const originalFileName = req.file.originalname.split(".")[0];
    const compressedFileName = Date.now() + "-" + originalFileName + ".avif";

    const compressedImageFilePath = path.join(
      __dirname,
      "../",
      "public",
      "images",
      compressedFileName
    );

    const compressedImage = sharp(req.file.path).avif({ quality: 80 });

    const compressedImageResult = await compressedImage.toFile(
      compressedImageFilePath
    );

    if (compressedImageResult.size > 1024 * 1024) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Compressed image size must not excceed 1MB.",
        });
    }
    const result = await cloudinary.uploader.upload(compressedImageFilePath);

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
