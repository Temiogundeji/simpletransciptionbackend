import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const transcribeHandler = async (req, res) => {
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      Authorization: process.env.ASSEMBLYAI_API_KEY,
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await assembly.post("/transcript", {
      audio_url: req.body.data.url,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default transcribeHandler;
