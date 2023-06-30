import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  imageUrl: String,
  public_id: String,
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
