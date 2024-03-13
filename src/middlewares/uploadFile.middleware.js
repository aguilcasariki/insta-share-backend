import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId;
    const destinationPath = path.join("uploads", userId);
    try {
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }
      cb(null, destinationPath);
    } catch (error) {
      cb(error, null);
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    try {
      const fileExtension = path.extname(file.originalname);
      const newFilename = `${file.originalname}-${Date.now()}${fileExtension}`;
      cb(null, newFilename);
    } catch (error) {
      cb(error, null);
    }
  },
});

const upload = multer({ storage: storage });

export const uploadFiles = upload.array("myFiles", 10);
