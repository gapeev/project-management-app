import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { SharedModule } from '@shared/shared.module';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { SearchTasksComponent } from './components/search-tasks/search-tasks.component';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardPageComponent,
    CreateColumnComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    SearchTasksComponent,
  ],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
})
export class BoardModule {}
