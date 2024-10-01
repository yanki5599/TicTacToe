import { Game, Status } from '../models/types.js';
import JsonDAL from '../DAL/jsonDAL.js';
import dotenv from 'dotenv';
import { uuid } from 'uuidv4';
dotenv.config();

const jsonDAL = new JsonDAL<Game>(process.env.USERS_FILE_PATH  as string);



export const getGames = async (id: string): Promise<Game[]> => {
  const games = await jsonDAL.readJson();
  return games.filter((game) => game.playerXId === id || game.playerOId === id);
}


export const startGame = async (): Promise<Game> => {
  const games = await jsonDAL.readJson();
 
        
  const game: Game = {
    id: uuid(),
    playerXId: "",
    playerOId: "",
    status: Status.IN_PROGRESS,
  };

  games.push(game);
  await jsonDAL.writeJson(games);
  return game;
}