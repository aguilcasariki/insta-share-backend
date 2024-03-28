import { MongoClient, GridFSBucket } from "mongodb";
import fs from "fs";
import separateFilename from "./separateFilename.service.js";
import mime from "mime-types";

const uploadFile = async (compressedFilePath, compressedFileName, metadata) => {
  const client = await MongoClient.connect(
    "mongodb://localhost:27017/insta_share_db"
  );
  return new Promise((resolve, reject) => {
    try {
      const db = client.db("insta_share_db");
      const bucket = new GridFSBucket(db, {
        bucketName: "uploads",
      });
      const { fileExtension } = separateFilename(compressedFileName);

      const uploadStream = bucket.openUploadStream(compressedFileName, {
        chunkSizeBytes: 1048576,
        contentType: mime.lookup(fileExtension),
        metadata: metadata,
      });

      fs.createReadStream(compressedFilePath)
        .pipe(uploadStream)
        .on("error", (error) => {
          console.log("Error al subir el archivo comprimido", error);
          reject(error);
        })
        .on("finish", (data) => {
          // Aquí puedes obtener la información del archivo subido, como el _id
          // y devolverla. Por ejemplo, si quieres devolver el _id del archivo:
          resolve(data);
        });
    } catch (error) {
      console.log("Error al subir el archivo comprimido", error);
      reject(error);
    }
  });
};

export default uploadFile;
