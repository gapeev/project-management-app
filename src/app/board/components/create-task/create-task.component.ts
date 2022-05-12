import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Board, Column } from '@shared/models/board.model';
import { CreateTaskData } from '@shared/models/dialog.model';
import { UserInfo } from '@shared/models/user.model';
import { createTask } from '@store/actions/board.actions';
import { selectBoard } from '@store/selectors/board.selectors';
import { find, maxBy } from 'lodash';
import { Observable } from 'rxjs';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-create-task',
  templateUrl: 'create-task.component.html',
  styleUrls: ['create-task.component.scss'],
})

export class CreateTaskComponent implements OnInit {
  public createTaskForm!: FormGroup;

  public board$!: Observable<Board>;

  public users$!: Observable<UserInfo[]>;

  public ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      done: false,
    });
    this.board$ = this.store.select(selectBoard);
    this.users$ = this.boardService.getUsers();
  }

  public get title(): AbstractControl | null {
    return this.createTaskForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.createTaskForm.get('description');
  }

  public get userId(): AbstractControl | null {
    return this.createTaskForm.get('userId');
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onCreateClick(board: Board): void {
    this.dialogRef.close();
    const column: Column | undefined = find(board.columns, ['id', this.data.columnId]);
    if (!column) {
      return;
    }
    const order = (maxBy(column.tasks, 'order')?.order ?? -1) + 1;
    this.store.dispatch(
      createTask({
        boardId: board.id,
        columnId: column.id,
        task: { order, ...this.createTaskForm.value },
      })
    );
  }
  constructor(
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTaskData,
    private store: Store,
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) {}

}
