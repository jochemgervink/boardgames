import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { GameListComponent } from './game-list/game-list.component';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { AddGameComponent } from './add-game/add-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/gamelist', pathMatch: 'full' },
  { path: 'gamelist', component: GameListComponent },
  { path: 'dashboard', component: GameDashboardComponent },
  { path: 'detail/:id', component: GameDetailsComponent },
  { path: 'addgame', component: AddGameComponent },


];

@NgModule({
  imports:
  [ RouterModule.forRoot(routes) ],

  exports:
  [ RouterModule ]
})
export class AppRoutingModule { }
