import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { SharedModule } from '@shared/shared.module';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { SearchTasksPageComponent } from './pages/search-tasks-page/search-tasks-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardPageComponent,
    CreateBoardComponent,
    CreateColumnComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    SearchTasksPageComponent,
  ],
  imports: [CommonModule, BoardRoutingModule, SharedModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatIconModule, DragDropModule, MatProgressBarModule, MatTableModule, MatSortModule, MatPaginatorModule],
})

export class BoardModule {}
