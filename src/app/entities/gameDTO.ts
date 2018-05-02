import { GameTagDTO } from "./gameTagDTO";

export class GameDTO {
public GameId: number;
public Name: string;
public PublisherId: number;
public PublisherName: string;
public MinPlayers: number;
public MaxPlayers: number;
public Rating:number;
public Tags:GameTagDTO[];

constructor(){}
}
