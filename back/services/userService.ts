import { User } from "../models/types.js";
import JsonDAL from "../DAL/jsonDAL.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { UserNotFoundError } from "../models/errorTypes.js";
import dotenv from "dotenv";
dotenv.config();

const jsonDAL = new JsonDAL<User>(process.env.USERS_FILE_PATH as string);

export const createUser = async (username: string, password: string): Promise<User> => {
  const users = await jsonDAL.readJson();
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: uuid(),
    username: username,
    passwordHash: passwordHash,
  };
  users.push(newUser);
  await jsonDAL.writeJson(users);
  return newUser;
};

export const authenticateUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  const users = await jsonDAL.readJson();
  const user = users.find((u) => u.username === username);
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    return user;
  }
  return null;
};

export const getUserById = async (userId: string): Promise<User> => {
  const users = await jsonDAL.readJson();
  const user = users.find((u) => u.id === userId);
  if (!user) throw new UserNotFoundError();

  return user;
};
