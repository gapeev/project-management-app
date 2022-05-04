import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardMainComponent } from './components/board-main/board-main.component';
import { TaskComponent } from './components/task/task.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [BoardMainComponent, TaskComponent],
  imports: [CommonModule, BoardRoutingModule, MatButtonModule, MatCardModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [BoardMainComponent]
})

export class BoardModule {}
