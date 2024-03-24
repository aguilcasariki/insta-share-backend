const separateFilename = (filename) => {
  const lastDotIndex = filename.lastIndexOf(".");
  const fileExtension =
    lastDotIndex !== -1 ? filename.substring(lastDotIndex + 1) : "";
  const newFilename =
    lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
  return { newFilename, fileExtension };
};

export default separateFilename;
