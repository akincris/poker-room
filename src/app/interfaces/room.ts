import { IPlayer } from "./player";

export interface IRoom {
  id: string;
  startedAt?: number;
  players: IPlayer[];
}
