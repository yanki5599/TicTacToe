import express from "express";
import * as gameController from "../controller/gameController";

const router = express.Router();

router.route("/").get(gameController.getUserGames);
router.route("/start").post(gameController.startGame);

export default router;
