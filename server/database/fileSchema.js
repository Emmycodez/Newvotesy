import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  key: { type: String, required: true },
  url: { type: String, required: true }
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
