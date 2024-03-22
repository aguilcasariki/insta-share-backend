import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Uploaded", "Downloaded", "Renamed"],
    default: "Uploaded",
  },
  uploadYear: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,

    required: true,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
