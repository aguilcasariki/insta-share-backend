import { Router } from "express";
import renameFile from "../controllers/renameFile.controller.js";

const renameRouter = Router();

renameRouter.post(
  "/rename/:fileId",

  renameFile
);

export default renameRouter;
