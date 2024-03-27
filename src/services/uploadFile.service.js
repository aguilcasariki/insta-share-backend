import { MongoClient, GridFSBucket } from "mongodb";
import fs from "fs";
import separateFilename from "./separateFilename.service.js";
import mime from "mime-types";

const uploadFile = async (compressedFilePath, compressedFileName, metadata) => {
  try {
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/insta_share_db"
    );
    const db = client.db("insta_share_db");
    const bucket = new GridFSBucket(db, {
      bucketName: "uploads",
    });
    const { fileExtension } = separateFilename(compressedFileName);

    fs.createReadStream(compressedFilePath).pipe(
      bucket.openUploadStream(compressedFileName, {
        chunkSizeBytes: 1048576,
        contentType: mime.lookup(fileExtension),
        metadata: metadata,
      })
    );
  } catch (error) {
    console.log("Error al subir el archivo comprimido", error);
  }
};

export default uploadFile;
