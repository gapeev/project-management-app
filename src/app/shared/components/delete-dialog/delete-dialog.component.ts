import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogData, DeleteDialogResult } from '@shared/models/dialog.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  public onCancelClick(): void {
    this.dialogRef.close({ isConfirmed: false });
  }

  public onDeleteClick(): void {
    this.dialogRef.close({ isConfirmed: true });
  }

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent, DeleteDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
  ) {}
}
