import app from "./app.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "./index.html"));
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
