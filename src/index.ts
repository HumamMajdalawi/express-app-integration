import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

// Handle invalid routes or API endpoints
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Invalid API endpoint or route" });
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
