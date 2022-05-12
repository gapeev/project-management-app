import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { SearchTasksPageComponent } from './pages/search-tasks-page/search-tasks-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsPageComponent,
  },
  {
    path: 'search',
    component: SearchTasksPageComponent,
  },
  {
    path: ':id',
    component: BoardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BoardRoutingModule {}
