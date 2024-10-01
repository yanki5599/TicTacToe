import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (req: any, res: any, next: any) => {
  // check if the token is in the headers
  const token = req.headers.authorization;

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
    //   const user:User = await userController.getUserById(userId);
    // req.user = user;
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Unauthorized" });
  }

  next();
};
