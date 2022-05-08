import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [ReactiveFormsModule, MaterialModule, NotificationComponent, TranslateModule],
})
export class SharedModule {}
