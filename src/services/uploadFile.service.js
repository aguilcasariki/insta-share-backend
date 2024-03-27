import { MongoClient, GridFSBucket } from "mongodb";
import fs from "fs";

const uploadFile = async (compressedFilePath, compressedFileName, metadata) => {
  try {
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/insta_share_db"
    );
    const db = client.db("insta_share_db");
    const bucket = new GridFSBucket(db, {
      bucketName: "uploads",
    });

    fs.createReadStream(compressedFilePath).pipe(
      bucket.openUploadStream(compressedFileName, {
        chunkSizeBytes: 1048576,
        metadata: metadata,
      })
    );
  } catch (error) {
    console.log("Error al subir el archivo comprimido", error);
  }
};

export default uploadFile;
