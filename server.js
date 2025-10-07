import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/generate", generateRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 RAHL Dev AI Server running on port ${PORT}`));
