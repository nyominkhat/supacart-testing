import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import uploadImageRoutes from "./routes/uploadImage.route";
dotenv.config();

const app = express();

app.use(cors());

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
  } catch (error) {
    console.log(error);
  }
}

app.use("/api/upload", uploadImageRoutes);

app.listen(process.env.PORT, () => {
  connect();
  console.log("Server is listening on http://127.0.0.1:8000");
});
