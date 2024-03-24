import mongoose from "mongoose";

const downloadFileById = async (fileId) => {
  const filesCollection = mongoose.connection.db.collection("uploads.files");
  const chunksCollection = mongoose.connection.db.collection("uploads.chunks");

  // Buscar el archivo por ID
  const file = await filesCollection.findOne({
    _id: new mongoose.Types.ObjectId(fileId),
  });
  if (!file) {
    throw new Error("File not found");
  }

  // Obtener todos los chunks del archivo
  const chunks = await chunksCollection
    .find({ files_id: new mongoose.Types.ObjectId(fileId) })
    .sort({ n: 1 })
    .toArray();

  // Convertir los datos de los chunks a Buffer y concatenarlos
  const fileData = Buffer.concat(
    chunks.map((chunk) => Buffer.from(chunk.data.toString("base64"), "base64"))
  );

  return {
    fileData,
    contentType: file.contentType,
    filename: file.filename,
  };
};

// Exporta la función modificada
export { downloadFileById };
