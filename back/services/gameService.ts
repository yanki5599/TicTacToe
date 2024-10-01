import { Game, Status } from '../models/types.js';
import JsonDAL from '../DAL/jsonDAL.js';
import dotenv from 'dotenv';
import { uuid } from 'uuidv4';
dotenv.config();

const jsonDAL = new JsonDAL<Game>(process.env.GAMES_FILE_PATH  as string);

let currentGame: Game | null = null;

export const getGames = async (id: string): Promise<Game[]> => {
  const games = await jsonDAL.readJson();
  return games.filter((game) => game.playerXId === id || game.playerOId === id);
}


export const startGame = async (userId: string): Promise<Game> => {
 
  if(!currentGame){
    currentGame = {
      id: uuid(),
      playerXId: userId,
      playerOId: undefined,
      status: Status.NOT_STARTED
    }
  }
  else{
    currentGame.playerOId = userId;
    currentGame.status = Status.IN_PROGRESS;
  }

  return currentGame;
}