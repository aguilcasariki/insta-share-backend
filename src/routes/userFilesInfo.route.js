import express from "express";
import getUserFilesInfo from "../controllers/getUserFilesInfo.controller.js";

const usersFilesInfoRouter = express.Router();

usersFilesInfoRouter.get("/:userId?/files", getUserFilesInfo);

export default usersFilesInfoRouter;
