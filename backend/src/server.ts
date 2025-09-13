import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
