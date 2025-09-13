import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import courseRoutes from "./routes/Course";
import lectureRoutes from "./routes/Lecture";
import progressRoutes from "./routes/Progress";
import userRoutes from "./routes/user";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/user", userRoutes);

const mongoURI = process.env.MONGO_URI || "";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});