import express from "express";
import * as authController from "../controller/authController";
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

export default router;
