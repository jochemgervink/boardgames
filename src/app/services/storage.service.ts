import { Injectable } from '@angular/core';
import { GameDTO } from '../entities/gameDTO';
import { PublisherDTO } from '../entities/publisher';
import { GameTagDTO } from '../entities/gameTagDTO';
@Injectable()

export class StorageService {

  constructor() {}

  public getAllGames(){
    console.log('getAllGames')
    // return this.http.get<GameDTO[]>(environment.apiUrl + 'api/games').toPromise();
  }

  public getGame(id){
    console.log('getGame')
    console.log(id)
    // return this.http.get<GameDTO>(environment.apiUrl + 'api/games/'+id).toPromise();
  }

  getAllPublishers(){
    console.log('getAllPublishers')
    // return this.http.get<PublisherDTO[]>(environment.apiUrl + 'api/publishers').toPromise();
  }

  getAllTags(){
    console.log('getAllTags')
    // return this.http.get<GameTagDTO[]>(environment.apiUrl + 'api/tag').toPromise();
  }

  public saveGame(game){
    console.log('saveGame')
    console.log(game)
    // return this.http.put<GameDTO>(environment.apiUrl + 'api/games/' + game.id, game);
  }

  public createGame(game){
    console.log('createGame')
    console.log(game)
    // return this.http.post<GameDTO>(environment.apiUrl + 'api/games/' + game.id, game).toPromise();
  }

  public deleteGame(gameId){
    console.log('deleteGame')
    console.log(gameId)

    // var params = new HttpParams();
    // params.append('GameId', gameId);
    // return this.http.delete<GameDTO>(environment.apiUrl + 'api/games/' + gameId, {params:params});
  }
}

/*
  var testObject = { 'one': 1, 'two': 2, 'three': 3 };

  // Put the object into storage
  localStorage.setItem('testObject', JSON.stringify(testObject));

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('testObject');

  console.log('retrievedObject: ', JSON.parse(retrievedObject));
*/

