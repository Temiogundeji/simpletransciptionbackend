import express from "express";
import uploadHandler from "./controller/upload.js";
import transcribeHandler from "./controller/transcribe.js";
import resultHandler from "./controller/result.js";
import cors from "cors";
import logger from "morgan";

const app = express();
app.use(logger("dev"));

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.post("/api/upload", uploadHandler);
app.post("/api/transcribe", transcribeHandler);
app.post("/api/result", resultHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
