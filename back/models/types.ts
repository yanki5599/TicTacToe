export interface User {
  id: string;
  username: string;
  password: string;
}

export enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  X_WON = "X_WON",
  O_WON = "O_WON",
  DRAW = "DRAW",
}

export interface Game {
  id: string;
  playerXId: string;
  playerOId: string;
  status: Status;
}
