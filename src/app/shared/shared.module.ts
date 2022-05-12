import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditableTitleComponent } from './components/editable-title/editable-title.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';

@NgModule({
  declarations: [
    NotificationComponent,
    OrderByPipe,
    DeleteDialogComponent,
    EditableTitleComponent,
    CreateBoardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    NotificationComponent,
    OrderByPipe,
    EditableTitleComponent,
    TranslateModule,
    CreateBoardComponent,
  ],
})
export class SharedModule {}
