import { Router } from "express";
import { uploadFiles } from "../middlewares/uploadFile.middleware.js";
// import renameFile from "../services/renameFile.service.js";
import { zipFile } from "../services/zipFile.service.js";

const uploadRouter = Router();

uploadRouter.post(
  "/upload/:userId",

  uploadFiles,
  async (req, res) => {
    try {
      const uploadedFiles = req.files;
      const uploadUser = req.params.userId;

      res.status(200).json({ uploadedFiles });

      uploadedFiles.forEach((file) => {
        zipFile({ id: file.id.toString() }, uploadUser)
          .then(() =>
            console.log(`Archivo ${file.id} comprimido exitosamente.`)
          )
          .catch((error) =>
            console.error(`Error al comprimir el archivo ${file.id}:`, error)
          );
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default uploadRouter;
