import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { BsDropdownModule, RatingModule, SortableModule, ModalModule, BsModalService  } from 'ngx-bootstrap';
import { AddGameComponent } from './add-game/add-game.component';
import { StorageService } from './services/storage.service';






@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameDetailsComponent,
    GameDashboardComponent,
    AddGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    Angular2FontawesomeModule,
    [BsDropdownModule.forRoot()],
    RatingModule,
    ReactiveFormsModule,
    [SortableModule.forRoot()],
    [ModalModule.forRoot()]

  ],
  providers: [HttpService,
  StorageService,
  BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
