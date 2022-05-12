import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditableTitleComponent } from './components/editable-title/editable-title.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [NotificationComponent, OrderByPipe, DeleteDialogComponent, EditableTitleComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatDialogModule],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    NotificationComponent,
    OrderByPipe,
    EditableTitleComponent,
  ],
})
export class SharedModule {}
