import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
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

  private getType() {
    let itemType;
    const type = this.data.type.toUpperCase();
    this.translate.get('DELETE-DIALOG.' + type).subscribe((res) => (itemType = res));
    return itemType;
  }

  public param = { type: this.getType(), target: this.data.target };

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent, DeleteDialogResult>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
  ) {}
}
