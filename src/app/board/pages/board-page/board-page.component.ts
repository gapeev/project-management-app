import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Board, Column, Task } from '@shared/models/board.model';
import {
  changeColumnIndex,
  changeTaskIndex,
  deleteColumn,
  deleteTask,
  fetchBoard,
  fetchBoardFailure,
  moveTask,
  updateColumn,
} from '@store/actions/board.actions';
import { selectBoard, selectIsBoardPending } from '@store/selectors/board.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { DeleteDialogData, DeleteDialogResult } from '@shared/models/dialog.model';
import { CreateColumnComponent } from '../../components/create-column/create-column.component';
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import { UpdateTaskComponent } from '../../components/update-task/update-task.component';
import { omit } from 'lodash';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public board$!: Observable<Board>;

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.store.dispatch(fetchBoard({ id: params['id'] }));
    });
    this.board$ = this.store.select(selectBoard);
  }

  public get isPending(): Observable<boolean> {
    return this.store.select(selectIsBoardPending);
  }

  public onErrorConfirm(): void {
    this.store.dispatch(fetchBoardFailure());
  }

  public dropTask(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container && event.previousIndex === event.currentIndex) {
      return;
    }

    const { columnId: currColumnId } = event.container.element.nativeElement.dataset;
    const { columnId: prevColumnId } = event.previousContainer.element.nativeElement.dataset;
    if (!currColumnId || !prevColumnId) {
      return;
    }

    if (event.previousContainer === event.container) {
      this.store.dispatch(
        changeTaskIndex({
          columnId: currColumnId,
          prevIndex: event.previousIndex,
          currIndex: event.currentIndex,
        })
      );
    } else {
      this.store.dispatch(
        moveTask({
          prevColumnId,
          currColumnId,
          prevIndex: event.previousIndex,
          currIndex: event.currentIndex,
        })
      );
    }
  }

  public dropColumn(event: CdkDragDrop<Column[]>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    this.store.dispatch(
      changeColumnIndex({
        prevIndex: event.previousIndex,
        currIndex: event.currentIndex,
      })
    );
  }

  public deleteTask(columnId: string, taskId: string, taskTitle: string): void {
    this.showDialog({ target: taskTitle, type: 'task' }).subscribe(({ isConfirmed }) => {
      if (!isConfirmed) {
        return;
      }
      this.store.dispatch(deleteTask({ columnId, taskId }));
    });
  }

  public deleteColumn(columnId: string, columnTitle: string): void {
    this.showDialog({ target: columnTitle, type: 'column' }).subscribe(({ isConfirmed }) => {
      if (!isConfirmed) {
        return;
      }
      this.store.dispatch(deleteColumn({ columnId }));
    });
  }

  public createColumn(): void {
    const dialogRef = this.dialog.open(CreateColumnComponent, {
      width: '400px',
    });
  }

  private showDialog(data: DeleteDialogData): Observable<DeleteDialogResult> {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { target: data.target, type: data.type },
    });

    return dialogRef.afterClosed();
  }

  public createTask(columnId: string): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '400px',
      data: { columnId },
    });
  }

  public selectTask(columnId: string, task: Task): void {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      width: '400px',
      data: { columnId, task },
    });
  }

  public updateColumn(boardId: string, column: Column): (columnTitle: string) => void {
    return (columnTitle: string) => {
      this.store.dispatch(
        updateColumn({ boardId, column: { ...omit(column, 'tasks'), title: columnTitle } })
      );
    };
  }

  constructor(private route: ActivatedRoute, private store: Store, public dialog: MatDialog) {}
}
