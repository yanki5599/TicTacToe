import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use(authRouter);

app.use(authMiddleware);
