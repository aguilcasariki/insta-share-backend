import { Router } from "express";
import { uploadFiles } from "../middlewares/uploadFile.middleware.js";

const uploadRouter = Router();

uploadRouter.post("/upload/:userId", uploadFiles, (req, res) => {
  res.send("Files uploaded successfully.");
});

export default uploadRouter;
