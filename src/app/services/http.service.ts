import { Injectable,  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { GameDTO } from '../entities/gameDTO';
import { PublisherDTO } from '../entities/publisher';
import { GameTagDTO } from '../entities/gameTagDTO';
@Injectable()
export class HttpService {

  constructor(private http:HttpClient) {
    var headers = new HttpHeaders({'Access-Control-Allow-Origin' :  '*'});

   }


  public getAllGames(){
    return this.http.get<GameDTO[]>(environment.apiUrl + 'api/games').toPromise();
  }

  public getGame(id){
    return this.http.get<GameDTO>(environment.apiUrl + 'api/games/'+id).toPromise();
  }

  getAllPublishers(){
    return this.http.get<PublisherDTO[]>(environment.apiUrl + 'api/publishers').toPromise();
  }

  getAllTags(){
    return this.http.get<GameTagDTO[]>(environment.apiUrl + 'api/tag').toPromise();
  }

  public saveGame(game){
    return this.http.put<GameDTO>(environment.apiUrl + 'api/games/' + game.id, game);
  }

  public createGame(game){
    return this.http.post<GameDTO>(environment.apiUrl + 'api/games/' + game.id, game).toPromise();
  }

  public deleteGame(gameId){
    var params = new HttpParams();
    params.append('GameId', gameId);
    return this.http.delete<GameDTO>(environment.apiUrl + 'api/games/' + gameId, {params:params});
  }


}
