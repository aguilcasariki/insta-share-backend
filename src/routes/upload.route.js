import { Router } from "express";
import { uploadFiles } from "../middlewares/uploadFile.middleware.js";
// import renameFile from "../services/renameFile.service.js";
// import { zipFile } from "../services/zipFile.service.js";

const uploadRouter = Router();

uploadRouter.post(
  "/upload/:userId",

  uploadFiles,
  async (req, res) => {
    try {
      // const filepath = await renameFile(
      //   req.params.userId,
      //   req.files[0].filename,
      //   req.body.fileName
      // );
      // zipFile(filepath.newPath);

      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default uploadRouter;
