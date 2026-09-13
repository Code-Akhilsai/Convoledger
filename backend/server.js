import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use("/api", router);

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "successfull health" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
