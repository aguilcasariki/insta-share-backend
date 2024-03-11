import fs from "fs";

export const fileExists = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new Error("File not found"));
      } else {
        resolve(true);
      }
    });
  });
};
