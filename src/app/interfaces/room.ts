import { IPlayer } from "./player";

export interface IRoom {
  id: string;
  players: IPlayer[];
}
