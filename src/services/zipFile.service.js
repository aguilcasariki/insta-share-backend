import { downloadFileById } from "./downloadFileById.service.js";
import archiver from "archiver";
import uploadFile from "./uploadFile.service.js";
import fs from "fs";
import path from "path";
import separateFilename from "./separateFilename.service.js";

export const zipFile = async (fileId, user) => {
  const { fileData, filename } = await downloadFileById(fileId);
  try {
    // Descarga el archivo de la base de datos

    // Crea un stream de salida para la compresión
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Setea el nivel de compresión
    });

    // Configura el archivo de entrada
    archive.append(fileData, { name: filename });

    const { newFilename } = separateFilename(filename); // Define la carpeta de destino y el nombre del archivo comprimido
    const folderPath = "./compressedFiles"; // Ajusta esta ruta según sea necesario
    const compressedFileName = `${newFilename}.zip`;
    const compressedFilePath = path.join(folderPath, compressedFileName);

    // Asegúrate de que la carpeta exista
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Crea un stream de escritura al archivo comprimido
    const output = fs.createWriteStream(compressedFilePath);
    archive.pipe(output);

    // Finaliza el archivo de salida
    await archive.finalize();

    // Metadatos específicos para el archivo comprimido
    const metadata = {
      uploadUser: user, // Asume un valor por defecto, ajusta según sea necesario
      status: "Uploaded",
    };

    // Sube el archivo comprimido a MongoDB utilizando GridFS
    // Asegúrate de que la función uploadFile acepte un stream como entrada
    const fileId = await uploadFile(
      compressedFilePath, // Aquí se pasa el stream del archivo comprimido
      compressedFileName, // Asegúrate de que el nombre del archivo sea correcto
      metadata
    );
    console.log("Archivo comprimido subido con éxito a MongoDB", fileId);

    return fileId; // Retorna el ID del archivo comprimido en MongoDB
  } catch (error) {
    console.error("Error al comprimir y subir el archivo:", error);
    throw error;
  }
};
