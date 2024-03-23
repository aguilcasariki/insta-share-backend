import mongoose from "mongoose";

const renameFile = async (req, res) => {
  try {
    const newFileName = req.body.newFileName;
    const fileId = req.params.fileId;
    const collection = mongoose.connection.db.collection("uploads.files");

    console.log("fileId", fileId);
    const updatedFile = await collection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(fileId) },
      { $set: { filename: newFileName } },
      { returnDocument: "after" }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found " });
    }

    res.status(200).json({ message: "File renamed successfully", updatedFile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default renameFile;
