import fs from "fs";
import path from "path";
export const downloadFile = (req, res) => {
  const filePath = req.params.filePath;

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + path.basename(filePath)
    );
    res.setHeader("Content-Type", "application/octet-stream");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error al leer el archivo.");
  }
};
