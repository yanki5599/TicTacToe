import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService.js';
import * as gamesService from '../services/gameService.js';
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET:string = process.env.JWT_SECRET as string;

export const getUserGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const games = await gamesService.getGames((req as any).user.id);
    res.json(games);
  } catch (error) 
  { next(error); }
};


export const startGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await gamesService.startGame();
    res.json(game);
  } catch (error) 
  { next(error); }
};