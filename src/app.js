import express from "express";
import morgan from "morgan";
import downloadRouter from "./routes/download.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import usersFilesInfoRouter from "./routes/userFilesInfo.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", uploadRouter);
app.use("/api", downloadRouter);
app.use("/api", usersFilesInfoRouter);

export default app;
