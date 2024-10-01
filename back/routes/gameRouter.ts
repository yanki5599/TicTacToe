import express from "express";
import * as gameController from "../controllers/gamesController"

const router = express.Router();

router.route("/").get(gameController.getUserGames);
router.route("/start").post(gameController.startGame);

export default router;
