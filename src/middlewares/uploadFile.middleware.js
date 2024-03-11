import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const newFilename = `${file.fieldname}-${Date.now()}${fileExtension}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

export const uploadFiles = upload.array("myFiles", 10);
