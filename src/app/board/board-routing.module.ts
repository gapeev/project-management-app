import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardMainComponent} from "./components/board-main/board-main.component";

const routes: Routes = [
  { path: '', component: BoardMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BoardRoutingModule {}
