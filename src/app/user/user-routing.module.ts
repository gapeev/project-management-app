import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserPageComponent } from './pages/update-user-page/update-user-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'update',
  },
  {
    path: 'update',
    component: UpdateUserPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
