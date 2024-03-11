export const downloadFile = (filepath, res) => {
  return new Promise((resolve, reject) => {
    res.download(filepath, (err) => {
      if (err) {
        reject(new Error("Error downloading file"));
      } else {
        resolve(true);
      }
    });
  });
};
