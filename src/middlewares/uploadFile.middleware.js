// src/middlewares/uploadFile.middleware.js
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();

// Configuración de GridFsStorage
const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // Reemplaza con tu URL de conexión a MongoDB
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      try {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: {
            uploadUser: req.params.userId,
            status: "Uploaded",
          },
        };
        resolve(fileInfo);
      } catch (error) {
        reject(error);
      }
    });
  },
});

const upload = multer({ storage: storage });

export const uploadFiles = upload.array("myFiles", 10);
