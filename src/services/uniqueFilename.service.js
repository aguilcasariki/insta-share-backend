import { v4 } from "uuid";

const uniqueFilename = (filename) => {
  const uuid = v4();
  const lastDotIndex = filename.lastIndexOf(".");
  const fileExtension =
    lastDotIndex !== -1 ? filename.substring(lastDotIndex + 1) : "";
  const newFilename =
    lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
  return newFilename + uuid + "." + fileExtension;
};

export default uniqueFilename;
