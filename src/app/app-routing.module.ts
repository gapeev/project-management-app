import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardMainComponent} from "./board/components/board-main/board-main.component";

const routes: Routes = [
  { path: '', component: BoardMainComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
