import fs from "fs";
import path from "path";

const getFilesInfoRecursively = (directoryPath) => {
  let filesInfo = [];

  try {
    const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Si es un directorio, busca de manera recursiva
        filesInfo = filesInfo.concat(getFilesInfoRecursively(filePath));
      } else {
        // Si es un archivo, agrega su información
        const parsedPath = path.parse(filePath);
        filesInfo.push({
          name: parsedPath.name,
          extension: parsedPath.ext,
          status: "Uploaded",
          size: `${Math.round(stats.size / (1024 * 1024))} mb`,
        });
      }
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }

  return filesInfo;
};

const getUserFilesInfo = (req, res) => {
  const userId = req.params.userId;
  let directoryPath;

  if (userId) {
    directoryPath = path.join("uploads", userId);
  } else {
    directoryPath = "uploads";
  }

  try {
    const filesInfo = userId ? getFilesInfoRecursively(directoryPath) : [];
    res.json(filesInfo);
  } catch (err) {
    return res.status(500).send("Error al leer el directorio.");
  }
};

export default getUserFilesInfo;
