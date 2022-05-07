import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UpdateUserPageComponent } from './pages/update-user-page/update-user-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [UpdateUserPageComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
