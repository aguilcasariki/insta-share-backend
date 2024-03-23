// src/middlewares/uploadFile.middleware.js
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import { duplicatedFilename } from "../services/duplicatedFilename.service.js";
dotenv.config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: async (req, file) => {
    try {
      const uploadUser = req.params.userId;
      const filename = await duplicatedFilename(file.originalname, uploadUser);

      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
        metadata: {
          uploadUser: uploadUser,
          status: "Uploaded",
        },
      };
      return fileInfo;
    } catch (error) {
      return error;
    }
  },
});

const upload = multer({ storage: storage });

export const uploadFiles = upload.array("myFiles", 10);
