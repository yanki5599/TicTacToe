import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/types";
import * as userService from "../services/userService";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) {
    res.status(401).send({ message: "Unauthorized, missing token" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const userId = (decoded as { id: string }).id;

  if (!userId) {
    res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const user: User = await userService.getUserById(userId);
    (req as any).user = user;
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Unauthorized" });
  }

  next();
};
