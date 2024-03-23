import { Router } from "express";

import { downloadFile } from "../controllers/downloadFile.controller.js";

const downloadRouter = Router();

downloadRouter.get("/download/:fileId", downloadFile);

export default downloadRouter;
