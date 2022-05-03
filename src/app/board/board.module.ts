import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardMainComponent } from './components/board-main/board-main.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    BoardMainComponent,
    TaskComponent
  ],
  imports: [CommonModule, BoardRoutingModule],
})
export class BoardModule {}
