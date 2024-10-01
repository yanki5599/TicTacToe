import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/types";
import * as userService from "../services/userService";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if the token is in the headers
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

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
