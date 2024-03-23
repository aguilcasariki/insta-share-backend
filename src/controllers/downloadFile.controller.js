// src/controllers/downloadFile.controller.js
import mongoose from "mongoose";

// Asegúrate de que la conexión a la base de datos esté abierta antes de intentar usar GridFS

// Accede a la colección de archivos de GridFS

// Función para descargar un archivo
const downloadFile = async (req, res) => {
  const filesCollection = mongoose.connection.db.collection("uploads.files");
  const chunksCollection = mongoose.connection.db.collection("uploads.chunks");
  const fileId = req.params.fileId; // Asume que el ID del archivo se pasa como parámetro en la URL

  try {
    const file = await filesCollection.findOne({
      _id: new mongoose.Types.ObjectId(fileId),
    });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Obtener todos los chunks del archivo
    const chunks = await chunksCollection
      .find({ files_id: new mongoose.Types.ObjectId(fileId) })
      .sort({ n: 1 })
      .toArray();

    // Convertir los datos de los chunks a Buffer y concatenarlos
    const fileData = Buffer.concat(
      chunks.map((chunk) =>
        Buffer.from(chunk.data.toString("base64"), "base64")
      )
    );

    // Enviar el archivo al cliente
    res.setHeader("Content-Type", file.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.send(fileData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error downloading file", detail: error });
  }
};

// Exporta la función modificada
export { downloadFile };
