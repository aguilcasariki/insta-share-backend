import express from "express";
import morgan from "morgan";
import downloadRouter from "./routes/download.route.js";
import uploadRouter from "./routes/upload.route.js";
import usersFilesInfoRouter from "./routes/userFilesInfo.route.js";
import cors from "cors";
import renameRouter from "./routes/renameFile.route.js";
import compressFileRouter from "./routes/compress.route.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", uploadRouter);
app.use("/api", downloadRouter);
app.use("/api", usersFilesInfoRouter);
app.use("/api", renameRouter);
app.use("/api", compressFileRouter);

export default app;
