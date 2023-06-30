import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
const createImageFolderPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const compressedFolderPath = path.join(__dirname, "../", "public");

  if (!fs.existsSync(compressedFolderPath)) {
    await fs.promises.mkdir(compressedFolderPath);
  }
  next();
};

export default createImageFolderPath;
