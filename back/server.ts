import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter";
import { authMiddleware } from "./middleware/authMiddleware";
import gameRouter from "./routes/gameRouter";
import {Server} from "socket.io";
import http from "http";
import SocketController from "./controllers/socketController";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const socketController = new SocketController(io);
socketController.setupSocket();

app.use(express.json());

app.use("/auth", authRouter);

app.use(authMiddleware);

app.use("/games", gameRouter);









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


