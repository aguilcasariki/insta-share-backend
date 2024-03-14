import express from "express";
import getUserFilesInfo from "../controllers/getUserFilesInfo.controller.js";

const usersFilesInfoRouter = express.Router();

usersFilesInfoRouter.get("/user/files/:userId", getUserFilesInfo);

export default usersFilesInfoRouter;
