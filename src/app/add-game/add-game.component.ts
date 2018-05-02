import { Component, OnInit } from '@angular/core';
import { Location, FormatWidth } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GameDTO } from '../entities/gameDTO';
import { PublisherDTO } from '../entities/publisher';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  game:GameDTO = new GameDTO();
  gameRating:number;
  gameForm: FormGroup;
  publishers: PublisherDTO[] = [];
  formNameError: boolean;

  constructor(
    private fb: FormBuilder,
    private location:Location,
    private httpService:HttpService,
    private router:Router
  ) {
    this.gameForm = new FormGroup({
      'Name': new FormControl(this.game.Name, Validators.required),
      'MinPlayers': new FormControl(this.game.MinPlayers),
      'MaxPlayers': new FormControl(this.game.MaxPlayers),
    });
   }

  async ngOnInit() {
    this.publishers = await this.httpService.getAllPublishers();
    this.buildForm();
  }

  buildForm(){
    console.log(this.gameForm);
  }

  goBack():void{
    this.location.back();
  }

  async onSubmit(value: string) {
    //value is the form as an object
    // console.log(value);
    if (value['Name'] != null || value['Name'] == ""){
      this.formNameError=false;

      //Add to this.game
      this.game.Name = value['Name'];
      this.game.MinPlayers = value['MinPlayers'];
      this.game.MaxPlayers = value['MaxPlayers'];
      this.game.Rating = this.gameRating;
      //Then send to backend.
      console.log(this.game);
      let gameid = await this.httpService.createGame(this.game)
      console.log(gameid);
      this.router.navigateByUrl["/detail/{{gameid}}"];

    }
    else{
      this.formNameError=true;
    }
  }

  selectPublisher(pub){
    this.game.PublisherId = pub.PublisherId;
    this.game.PublisherName = pub.PublisherName;
  }

}
