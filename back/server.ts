import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter";
import { authMiddleware } from "./middleware/authMiddleware";
import gameRouter from "./routes/gameRouter";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.use(authMiddleware);

app.use("/games", gameRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
