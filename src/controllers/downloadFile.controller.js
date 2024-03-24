import { downloadFileById } from "../services/downloadFileById.service.js";

const downloadFile = async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const file = await downloadFileById(fileId);

    res.setHeader("Content-Type", file.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );

    res.send(file.fileData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error downloading file", detail: error });
  }
};

// Exporta la función modificada
export { downloadFile };
