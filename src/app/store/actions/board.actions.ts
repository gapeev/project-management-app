import { createAction, props } from '@ngrx/store';
import { Board, Column, Task, TaskSearch, TaskUpdate } from '@shared/models/board.model';

export const fetchBoards = createAction('[Boards Page] Fetch Boards');

export const fetchBoardsSuccess = createAction(
  '[Boards Page] Fetch Boards Success',
  props<{ boards: ReadonlyArray<Board> }>()
);

export const fetchBoard = createAction('[Board Page] Fetch Board', props<{ id: string }>());

export const fetchBoardSuccess = createAction(
  '[Board Page] Fetch Board Success',
  props<{ board: Board }>()
);

export const fetchBoardFailure = createAction('[Board Page] Fetch Board Failure');

export const changeTaskIndex = createAction(
  '[Board Page] Change Task Index',
  props<{ columnId: string; prevIndex: number; currIndex: number }>()
);

export const moveTask = createAction(
  '[Board Page] Move Task',
  props<{
    prevColumnId: string;
    currColumnId: string;
    prevIndex: number;
    currIndex: number;
  }>()
);

export const changeColumnIndex = createAction(
  '[Board Page] Change Column Index',
  props<{ prevIndex: number; currIndex: number }>()
);

export const deleteTask = createAction(
  '[Board Page] Delete Task',
  props<{ columnId: string; taskId: string }>()
);

export const deleteColumn = createAction(
  '[Board Page] Delete Column',
  props<{ columnId: string }>()
);

export const createBoard = createAction(
  '[Header] Create Board',
  props<{ title: string; description: string }>()
);

export const deleteBoard = createAction('[Boards Page] Delete Board', props<{ boardId: string }>());

export const createColumn = createAction(
  '[Board Page] Create Column',
  props<{ boardId: string; title: string; order: number }>()
);

export const createTask = createAction(
  '[Board Page] Create Task',
  props<{ boardId: string; columnId: string; task: Omit<Task, 'id' | 'files'> }>()
);

export const updateTask = createAction('[Board Page] Update Task', props<{ task: TaskUpdate }>());

export const updateColumn = createAction(
  '[Board Page] Update Column',
  props<{ boardId: string; column: Omit<Column, 'tasks'> }>()
);

export const getAllTasks = createAction('[Search Tasks Page] Get All Tasks');

export const getAllTasksSuccess = createAction(
  '[Search Tasks Page] Get All Tasks Success',
  props<{ tasks: TaskSearch[] }>()
);
