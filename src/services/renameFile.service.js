import fs from "fs";
import path from "path";

export default function renameFile(userId, filename, newFilename) {
  const oldPath = path.join("uploads", userId, filename);
  const fileExtension = path.extname(filename);
  const newPath = path.join(
    "uploads",

    userId,
    `${newFilename}${fileExtension}`
  );

  if (!fs.existsSync(oldPath)) {
    return "The file does not exist:", oldPath;
  }

  function callback(err) {
    if (err) {
      return err;
    } else {
      return "File renamed successfully";
    }
  }

  fs.rename(oldPath, newPath, callback);
}
