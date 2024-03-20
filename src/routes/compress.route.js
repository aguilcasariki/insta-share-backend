import { Router } from "express";
import { onCompressionComplete } from "../services/zipFile.service.js";
const compressFileRouter = Router();

compressFileRouter.get("/compress", (req, res) => {
  // Configurar el encabezado de la respuesta para SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  onCompressionComplete((data) => {
    // Enviar una respuesta al cliente con los datos del evento
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});

export default compressFileRouter;
