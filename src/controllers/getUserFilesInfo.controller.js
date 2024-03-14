import fs from "fs";
import path from "path";

const getUserFilesInfo = (req, res) => {
  const userId = req.params.userId;
  const userDirectory = path.join("uploads", userId);

  fs.readdir(userDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Error al leer el directorio del usuario.");
    }

    const filesInfo = files.map((file) => {
      const filePath = path.join(userDirectory, file);
      const stats = fs.statSync(filePath);
      const parsedPath = path.parse(filePath);
      return {
        name: parsedPath.name,
        extension: parsedPath.ext,
        status: "Uploaded",
        size: `${Math.round(stats.size / (1024 * 1024))} mb`,
      };
    });

    res.json(filesInfo);
  });
};

export default getUserFilesInfo;
