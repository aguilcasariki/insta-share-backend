import mongoose from "mongoose";
import uniqueFilename from "./uniqueFilename.service.js";

export async function duplicatedFilename(filename, user) {
  try {
    // Accede a la colección 'uploads.files'
    const collection = mongoose.connection.db.collection("uploads.files");

    // Busca un archivo con el nombre especificado
    const existingFile = await collection.findOne({
      filename: filename,
      "metadata.uploadUser": user,
    });

    if (existingFile) {
      return uniqueFilename(filename);
    } else {
      return filename;
    }
  } catch (error) {
    console.error("Error al verificar la existencia del archivo:", error);
    throw error; // O maneja el error como prefieras
  }
}
