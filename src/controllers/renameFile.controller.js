import mongoose from "mongoose";
import separateFilename from "../services/separateFilename.service.js";
import mime from "mime-types";

const renameFile = async (req, res) => {
  try {
    const { renameFileName, filename } = req.body;

    const collection = mongoose.connection.db.collection("uploads.files");

    const { newFilename } = separateFilename(filename);

    // Busca documentos cuyo campo 'filename' coincida exactamente con el valor de 'filename' proporcionado, seguido de un punto
    const renamedFiles = await collection
      .find({ filename: { $regex: `^${newFilename}.*` } })
      .toArray();

    if (renamedFiles.length === 0) {
      return res
        .status(404)
        .json({ message: "No files found with the specified filename" });
    }

    // Actualiza cada documento encontrado con el nuevo nombre de archivo
    for (const file of renamedFiles) {
      const renameFileNamewithExt = `${renameFileName}.${mime.extension(file.contentType)}`;
      await collection.updateOne(
        { _id: file._id },
        { $set: { filename: renameFileNamewithExt } }
      );
    }

    res.status(200).json({ message: "Files renamed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default renameFile;
