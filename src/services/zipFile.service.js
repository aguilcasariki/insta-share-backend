import fs from "fs";
import path from "path";
import archiver from "archiver";
import { EventEmitter } from "events";

const compressionEventEmitter = new EventEmitter();

export const zipFile = (filePath) => {
  return new Promise((resolve, reject) => {
    // Extrae el directorio y el nombre del archivo original de la ruta proporcionada
    const dirPath = path.dirname(filePath);
    const originalFileName = path.basename(filePath, path.extname(filePath));

    // Construye la ruta del archivo comprimido
    const zipFilePath = path.join(dirPath, `${originalFileName}.zip`);

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
      resolve(zipFilePath);
      compressionEventEmitter.emit("compressionComplete", {
        name: path.basename(zipFilePath),
        path: zipFilePath,
      });
    });

    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        // log warning
      } else {
        // throw error
        reject(err);
      }
    });

    archive.on("error", function (err) {
      reject(err);
    });

    archive.pipe(output);
    archive.file(filePath, { name: originalFileName });
    archive.finalize();
  });
};

// Función para agregar un oyente al evento compressionComplete
export function onCompressionComplete(callback) {
  compressionEventEmitter.on("compressionComplete", callback);
}
