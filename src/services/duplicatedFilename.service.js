import mongoose from "mongoose";
import { v4 } from "uuid";
import separateFilename from "./separateFilename.service.js";

export async function duplicatedFilename(filename, user) {
  const uuid = v4();
  try {
    // Accede a la colección 'uploads.files'
    const collection = mongoose.connection.db.collection("uploads.files");

    // Busca un archivo con el nombre especificado
    const existingFile = await collection.findOne({
      filename: filename,
      "metadata.uploadUser": user,
    });

    if (existingFile) {
      const { newFilename, fileExtension } = separateFilename(filename);
      return newFilename + uuid + "." + fileExtension;
    } else {
      return filename;
    }
  } catch (error) {
    console.error("Error al verificar la existencia del archivo:", error);
    throw error;
  }
}
