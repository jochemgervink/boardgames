import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameDTO } from '../entities/gameDTO';
import { PublisherDTO } from '../entities/publisher';
import { GameTagDTO } from '../entities/gameTagDTO';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})

export class GameDetailsComponent implements OnInit {

  newTagName:string = "";
  tagIdToRemove: number;

  @Input() game:GameDTO;
  publishers: PublisherDTO[] = [];
  tags: GameTagDTO[] = [];
  modalRef:BsModalRef;
//   mockTags: GameTagDTO[] =
//   [{Name: 'Casual', TagId: 2},
//   {Name: 'Fantasy', TagId: 1},
//   {Name: 'asdasd', TagId: 5},
//   {Name: '123123', TagId: 6}
// ];

  constructor(
    private route: ActivatedRoute,
    private httpService:HttpService,
    private location:Location,
    private modalService:BsModalService
  ) { }


  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.game = await this.httpService.getGame(id);
    this.tags = await this.httpService.getAllTags();
    this.setTagCheckboxes();
    this.publishers = await this.httpService.getAllPublishers();
    this.setTagCheckboxes();

  }

  setTagCheckboxes(){
    console.log("setting tags")

    this.game.Tags.forEach(gtag => {
      this.tags.forEach(tag =>{
        if (tag.TagId == gtag.TagId)
        {
          tag.Enabled = true;
        }
      })
    })
  };

  toggleTag(tag){

    // tag.Enabled = !tag.Enabled;
    // If the toggled tag is enabled in this.tags
    if (tag.Enabled)
    {
      console.log(tag.Name + " is enabled now")
      this.game.Tags.push(tag);
    }
    else
    {
      //remove from this.game.tags
      console.log(tag.Name + " is disabled now")
      var index = this.game.Tags.indexOf(tag, 0);
      if (index > -1) {
        this.game.Tags.splice(index, 1);
      }

    }
    console.log(this.game.Tags)
  }

  selectPublisher(pub){
    this.game.PublisherId = pub.PublisherId;
    this.game.PublisherName = pub.PublisherName;
  }
  goBack():void{
    this.location.back();
  }
  save(){
    console.log(this.game)
    this.httpService.saveGame(this.game).subscribe(x =>
      this.goBack()

    )
  }
  delete(){
    console.log("Deleted");
    this.httpService.deleteGame(this.game.GameId).subscribe(x =>
      this.goBack())
  }

  addTag(){
    console.log(this.newTagName);
  }

  confirmDeleteTag(template, tag){
    this.tagIdToRemove = tag.TagId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});

  }
  confirm(): void {
    console.log('Removing tag!'+this.tagIdToRemove);
    this.modalRef.hide();
  }

  decline(): void {
    console.log('Canceling operation!');
    this.modalRef.hide();
  }
}
