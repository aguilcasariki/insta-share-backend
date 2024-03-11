import express from "express";
import morgan from "morgan";
import downloadRouter from "./routes/download.routes.js";
import uploadRouter from "./routes/upload.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", uploadRouter);
app.use("/api", downloadRouter);
export default app;
