export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export enum Status {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  X_WON = "X_WON",
  O_WON = "O_WON",
  DRAW = "DRAW",
}

export interface Game {
  id: string;
  playerXId: string;
  playerOId?: string;
  status: Status;
}

export interface Move {
  gameId: "12345";
  player: "X";
  position: Position;
}

type Position = [number, number];