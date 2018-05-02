import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { GameDTO } from '../entities/gameDTO';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: GameDTO[] = [];
  filteredGames: GameDTO[] = [];
  filterText: string = "";
  lastSortParam: string = "";


  constructor(
    private httpService:HttpService,
    private storageService:StorageService

  ) {
  }

  async ngOnInit() {
    this.games = await this.httpService.getAllGames();
    this.filteredGames = this.games;
    this.storageService.getAllGames();
  }

  search(){
    // TODO
    // console.log(this.filterText);
    if (this.filterText ==""){
      this.filteredGames = this.games;
    }
    else if (this.games != null){
      this.filteredGames = [];
      // console.log(this.games);
      this.games.forEach(game => {
        if (game!= null){
          console.log(game);
          for (let prop in game)
          {
            if (!this.filteredGames.includes(game))
            {
            // console.log(prop)
              if (prop != null && prop != "PublisherId" && prop != "Rating")
              {
                if (game[prop] != null)
                {
                let p = game[prop].toString().toLowerCase();
                  if(p.indexOf(this.filterText.toLowerCase()) != -1)
                  {
                    this.filteredGames.push(game);
                  }
                }
              }
            }
          }
          for (let tag in game.Tags){
            console.log(tag)
            if(game.Tags[tag].Name.toLowerCase().indexOf(this.filterText.toLowerCase()) != -1 && !this.filteredGames.includes(game))
            {
              this.filteredGames.push(game);
            }
          };

        }
      });
    }
  }
  searchProp(propName, searchText){
    console.log(propName);
    console.log(searchText);
    if (propName != "" || null && searchText != "" || null && this.games != null){
      this.filteredGames = [];
      this.games.forEach(game => {
        if (game!= null){

          switch(propName) {
            case "MinPlayers": {
              let minPlayers:number = game[propName] as number;
              let text:number = searchText as number;

              if(minPlayers >= text){
                this.filteredGames.push(game);
              }
              // else
              // {
              //   let index: number = this.filteredGames.indexOf(game);
              //   if (index !== -1) {
              //       this.filteredGames.splice(index, 1);
              //   }
              // }
              break;
            }
            case "MaxPlayers": {
              let maxPlayers:number = game[propName] as number;
              let text:number = searchText as number;

              if(maxPlayers <= text){
                this.filteredGames.push(game);
              }
              // else
              // {
              //   let index: number = this.filteredGames.indexOf(game);
              //   if (index !== -1) {
              //       this.filteredGames.splice(index, 1);
              //   }
              // }
               break;
            }
            default: {
              if (game[propName] != null){
                let p = game[propName].toString().toLowerCase();
                if(p.indexOf(searchText.toLowerCase()) != -1){
                  this.filteredGames.push(game);
                }
              }
              break;
            }
         }



        }
      })



    }
  }


  // sortby contains the parameter of the game to sort by as a string
  sort(sortBy){
    if (this.lastSortParam != sortBy){
      this.filteredGames.sort(function(a,b) {return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);} );
      console.log("sorting by " + sortBy + " ascending"  );
      this.lastSortParam = sortBy;
    }
    else
    {
      this.filteredGames.sort(function(a,b) {return (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0);} );
      console.log("sorting by " + sortBy + " descending"  );
      this.lastSortParam = "";
    }
  }



}
