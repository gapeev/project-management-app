import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import {
  changeColumnIndex,
  changeTaskIndex,
  createBoard,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  deleteTask,
  fetchBoard,
  fetchBoardInit,
  fetchBoards,
  fetchBoardsSuccess,
  fetchBoardSuccess,
  getAllTasks,
  getAllTasksSuccess,
  moveTask,
  updateColumn,
  updateTask,
} from '@store/actions/board.actions';
import { BoardService } from 'src/app/board/services/board.service';
import { selectBoard } from '@store/selectors/board.selectors';
import { Task } from '@shared/models/board.model';

@Injectable()
export default class BoardEffects {
  private fetchBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBoards),
      mergeMap(() =>
        this.boardService.getBoards().pipe(map((boards) => fetchBoardsSuccess({ boards })))
      )
    );
  });

  private fetchBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBoard, fetchBoardInit),
      mergeMap(({ id }) =>
        this.boardService.getBoard(id).pipe(map((board) => fetchBoardSuccess({ board })))
      )
    );
  });

  private changeTaskIndex$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(changeTaskIndex),
        concatLatestFrom(() => this.store.select(selectBoard)),
        tap(([{ columnId }, board]) => {
          const tasks: Task[] | undefined = board.columns.find(({ id }) => id === columnId)?.tasks;
          if (!tasks) {
            return;
          }
          this.boardService.updateTasks(board.id, columnId, tasks).subscribe();
        })
      );
    },
    { dispatch: false }
  );

  private moveTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(moveTask),
        concatLatestFrom(() => this.store.select(selectBoard)),
        tap(([{ currColumnId, currIndex }, board]) => {
          const tasks: Task[] | undefined = board.columns.find(
            ({ id }) => id === currColumnId
          )?.tasks;
          if (!tasks) {
            return;
          }
          this.boardService.updateTasks(board.id, currColumnId, tasks, true, currIndex).subscribe();
        })
      );
    },
    { dispatch: false }
  );

  private changeColumnIndex$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(changeColumnIndex),
        concatLatestFrom(() => this.store.select(selectBoard)),
        tap(([_, board]) => {
          this.boardService.updateColumns(board.id, board.columns).subscribe();
        })
      );
    },
    { dispatch: false }
  );

  private deleteTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteTask),
        concatLatestFrom(() => this.store.select(selectBoard)),
        tap(([{ columnId, taskId }, board]) => {
          this.boardService.deleteTask(board.id, columnId, taskId).subscribe();
        })
      );
    },
    { dispatch: false }
  );

  private deleteColumn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteColumn),
        concatLatestFrom(() => this.store.select(selectBoard)),
        tap(([{ columnId }, board]) => {
          this.boardService.deleteColumn(board.id, columnId).subscribe();
        })
      );
    },
    { dispatch: false }
  );

  private createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBoard),
      mergeMap(({ title, description }) =>
        this.boardService.createBoard(title, description).pipe(map(() => fetchBoards()))
      )
    );
  });

  private deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBoard),
      mergeMap(({ boardId }) =>
        this.boardService.deleteBoard(boardId).pipe(map(() => fetchBoards()))
      )
    );
  });

  private createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createColumn),
      mergeMap(({ boardId, title, order }) =>
        this.boardService
          .createColumn(boardId, title, order)
          .pipe(map(() => fetchBoard({ id: boardId })))
      )
    );
  });

  private createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTask),
      mergeMap(({ boardId, columnId, task }) =>
        this.boardService
          .createTask(boardId, columnId, task)
          .pipe(map(() => fetchBoard({ id: boardId })))
      )
    );
  });

  private updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      mergeMap(({ task }) =>
        this.boardService.updateTask(task).pipe(map(() => fetchBoard({ id: task.boardId })))
      )
    );
  });

  private updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateColumn),
      mergeMap(({ boardId, column }) =>
        this.boardService.updateColumn(boardId, column).pipe(map(() => fetchBoard({ id: boardId })))
      )
    );
  });

  private getAllTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllTasks),
      mergeMap(() =>
        this.boardService.getAllTasks().pipe(map((tasks) => getAllTasksSuccess({ tasks })))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store
  ) {}
}
