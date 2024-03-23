import mongoose from "mongoose";

const getUserFilesInfo = async (req, res) => {
  try {
    const user = req.params.userId;
    const collection = mongoose.connection.db.collection("uploads.files");
    const userFiles = await collection
      .find({
        "metadata.uploadUser": user,
      })
      .toArray();

    res.status(200).json({ userFiles });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getUserFilesInfo;
