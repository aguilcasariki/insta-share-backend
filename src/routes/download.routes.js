import { Router } from "express";
import { fileURLToPath } from "url";
import path from "path";
import { downloadFile } from "../controllers/downloadFile.controller.js";
import { fileExists } from "../controllers/fileExist.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadRouter = Router();

downloadRouter.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;

  const filepath = path.join(__dirname, "../../upload", filename);

  try {
    await fileExists(filepath);
    await downloadFile(filepath, res);
  } catch (error) {
    console.error(error.message);
    return res.status(404).send("File not found");
  }
});

export default downloadRouter;
