import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board, Column } from '@shared/models/board.model';
import { UpdateTaskData } from '@shared/models/dialog.model';
import { UserInfo } from '@shared/models/user.model';
import { createTask, updateTask } from '@store/actions/board.actions';
import { selectBoard } from '@store/selectors/board.selectors';
import { find, maxBy } from 'lodash';
import { Observable } from 'rxjs';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent implements OnInit {
  public updateTaskForm!: FormGroup;

  public board$!: Observable<Board>;

  public users$!: Observable<UserInfo[]>;

  public ngOnInit(): void {
    const { task } = this.data;

    this.updateTaskForm = this.formBuilder.group({
      title: [task.title, [Validators.required]],
      description: [task.description, [Validators.required]],
      userId: [task.userId, [Validators.required]],
      done: task.done,
    });
    this.board$ = this.store.select(selectBoard);
    this.users$ = this.boardService.getUsers();
  }

  public get title(): AbstractControl | null {
    return this.updateTaskForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.updateTaskForm.get('description');
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onUpdateClick(board: Board): void {
    const { order, id: taskId } = this.data.task;
    this.dialogRef.close();
    this.store.dispatch(
      updateTask({
        task: {
          id: taskId,
          order,
          boardId: board.id,
          columnId: this.data.columnId,
          ...this.updateTaskForm.value,
        },
      })
    );
  }

  constructor(
    private dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateTaskData,
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) {}
}
