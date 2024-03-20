import fs from "fs";
import path from "path";

export default function renameFile(userId, filename, newFilename) {
  return new Promise((resolve, reject) => {
    const oldPath = path.join("uploads", userId, filename);
    const newPath = path.join("uploads", userId, newFilename);

    if (!fs.existsSync(oldPath)) {
      reject("The file does not exist: " + oldPath);
    } else {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            msg: "File renamed successfully",
            newPath,
          });
        }
      });
    }
  });
}
