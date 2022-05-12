import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Board } from '@shared/models/board.model';
import { createColumn } from '@store/actions/board.actions';
import { selectBoard } from '@store/selectors/board.selectors';
import { maxBy } from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent implements OnInit {
  public createColumnForm!: FormGroup;

  public board$!: Observable<Board>;

  public ngOnInit(): void {
    this.createColumnForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
    this.board$ = this.store.select(selectBoard);
  }

  public get title(): AbstractControl | null {
    return this.createColumnForm.get('title');
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onCreateClick(board: Board): void {
    this.dialogRef.close();
    const order = (maxBy(board.columns, 'order')?.order ?? -1) + 1;
    this.store.dispatch(createColumn({ boardId: board.id, order, ...this.createColumnForm.value }));
  }

  constructor(
    private dialogRef: MatDialogRef<CreateColumnComponent>,
    private store: Store,
    private formBuilder: FormBuilder
  ) {}
}
