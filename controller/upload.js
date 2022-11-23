import axios from "axios";
import fs from "fs-extra";
import * as dotenv from "dotenv";
dotenv.config();

import multiparty from "multiparty";

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

const uploadHandler = async (req, res) => {
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      Authorization: process.env.ASSEMBLYAI_API_KEY,
      "Content-Type": "application/json",
      "transfer-encoding": "chunked",
    },
  });
  try {
    const { files } = await parseForm(req);
    const file = await fs.readFile(files.data[0].path); //Change to file, if data is not working!
    const response = await assembly.post("/upload", file);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default uploadHandler;
