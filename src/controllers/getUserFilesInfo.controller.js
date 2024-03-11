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
      return {
        name: file,
        status: stats.isFile() ? "file" : "directory",
        size: `${stats.size} bytes`,
      };
    });

    res.json(filesInfo);
  });
};

export default getUserFilesInfo;
