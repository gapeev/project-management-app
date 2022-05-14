import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { createReducer, on } from '@ngrx/store';
import { Board, Column, Task } from '@shared/models/board.model';
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
  fetchBoardFailure,
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
import { BoardState } from '@store/state.model';
import { sortBy } from 'lodash';

export const initialState: BoardState = {
  boards: [],
  board: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
  search: {
    type: 'title',
    query: '',
    tasks: [],
  },
  isPending: false,
};

export const boardReducer = createReducer(
  initialState,
  on(fetchBoards, (state): BoardState => ({ ...state, isPending: true })),
  on(
    fetchBoardsSuccess,
    (state, { boards }): BoardState => ({ ...state, boards, isPending: false })
  ),
  on(fetchBoard, (state): BoardState => ({ ...state, isPending: true })),
  on(
    fetchBoardInit,
    (state): BoardState => ({ ...state, board: initialState.board, isPending: true })
  ),
  on(fetchBoardSuccess, (state, data): BoardState => ({ ...state, ...data, isPending: false })),
  on(fetchBoardFailure, (state): BoardState => ({ ...state, isPending: false })),
  on(changeTaskIndex, (state, { columnId, prevIndex, currIndex }): BoardState => {
    const { board } = state;
    const targetColumnIndex: number = board.columns.findIndex(({ id }) => id === columnId);
    if (targetColumnIndex === -1) {
      return state;
    }

    const targetColumn: Column = board.columns[targetColumnIndex];
    const tasks: Task[] = sortBy(targetColumn.tasks, ['order']);
    moveItemInArray(tasks, prevIndex, currIndex);
    const orderedTasks: Task[] = tasks.map((task, index) => ({ ...task, order: index }));

    return {
      ...state,
      board: {
        ...board,
        columns: [
          ...board.columns.filter(({ id }) => id !== columnId),
          { ...targetColumn, tasks: orderedTasks },
        ],
      },
    };
  }),
  on(moveTask, (state, { prevColumnId, currColumnId, prevIndex, currIndex }): BoardState => {
    const { board } = state;
    const prevColumnIndex: number = board.columns.findIndex(({ id }) => id === prevColumnId);
    const currColumnIndex: number = board.columns.findIndex(({ id }) => id === currColumnId);
    if (prevColumnIndex === -1 || currColumnIndex === -1) {
      return state;
    }

    const prevColumn: Column = board.columns[prevColumnIndex];
    const currColumn: Column = board.columns[currColumnIndex];
    const prevTasks: Task[] = sortBy(prevColumn.tasks, ['order']);
    prevTasks[prevIndex] = { ...prevTasks[prevIndex], prevColumnId };
    const currTasks: Task[] = sortBy(currColumn.tasks, ['order']);
    transferArrayItem(prevTasks, currTasks, prevIndex, currIndex);
    const orderedPrevTasks: Task[] = prevTasks.map((task, index) => ({ ...task, order: index }));
    const orderedCurrTasks: Task[] = currTasks.map((task, index) => ({ ...task, order: index }));

    return {
      ...state,
      board: {
        ...board,
        columns: [
          ...board.columns.filter(({ id }) => id !== prevColumnId && id !== currColumnId),
          { ...prevColumn, tasks: orderedPrevTasks },
          { ...currColumn, tasks: orderedCurrTasks },
        ],
      },
    };
  }),
  on(changeColumnIndex, (state, { prevIndex, currIndex }): BoardState => {
    const { board } = state;
    const columns: Column[] = sortBy(board.columns, ['order']);
    const indexShift = (columns[columns.length - 1]?.order ?? 0) + 1;
    moveItemInArray(columns, prevIndex, currIndex);
    const orderedColumns: Column[] = columns.map((column, index) => ({
      ...column,
      order: index + indexShift,
    }));

    return {
      ...state,
      board: {
        ...board,
        columns: orderedColumns,
      },
    };
  }),
  on(deleteTask, (state, { columnId, taskId }): BoardState => {
    const { board } = state;
    const columnIndex: number = board.columns.findIndex(({ id }) => id === columnId);
    if (columnIndex === -1) {
      return state;
    }

    const column: Column = board.columns[columnIndex];

    return {
      ...state,
      board: {
        ...board,
        columns: [
          ...board.columns.filter(({ id }) => id !== columnId),
          { ...column, tasks: column.tasks.filter(({ id }) => id !== taskId) },
        ],
      },
    };
  }),
  on(deleteColumn, (state, { columnId }): BoardState => {
    const { board } = state;
    const columnIndex: number = board.columns.findIndex(({ id }) => id === columnId);
    if (columnIndex === -1) {
      return state;
    }

    const column: Column = board.columns[columnIndex];

    return {
      ...state,
      board: {
        ...board,
        columns: [...board.columns.filter(({ id }) => id !== columnId)],
      },
    };
  }),
  on(createBoard, (state): BoardState => ({ ...state, isPending: true })),
  on(deleteBoard, (state): BoardState => ({ ...state, isPending: true })),
  on(createColumn, (state): BoardState => ({ ...state, isPending: true })),
  on(createTask, (state): BoardState => ({ ...state, isPending: true })),
  on(updateTask, (state): BoardState => ({ ...state, isPending: true })),
  on(updateColumn, (state): BoardState => ({ ...state, isPending: true })),
  on(getAllTasks, (state): BoardState => ({ ...state, isPending: true })),
  on(
    getAllTasksSuccess,
    (state, { tasks }): BoardState => ({
      ...state,
      search: { ...state.search, tasks },
      isPending: false,
    })
  )
);
