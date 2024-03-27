import { downloadFileById } from "../services/downloadFileById.service.js";

const downloadFile = async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const file = await downloadFileById(fileId);

    if (!file.contentType) {
      file.contentType = "application/zip";
    }

    res.setHeader("Content-Type", file.contentType);
    const safeFilename = encodeURIComponent(file.filename);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`
    );

    res.send(file.fileData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error downloading file", detail: error });
  }
};

export { downloadFile };
