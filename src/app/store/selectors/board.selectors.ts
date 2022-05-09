import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from '@store/state.model';

export const selectBoardState = createFeatureSelector<BoardState>('board');
export const selectBoards = createSelector(selectBoardState, ({ boards }) => boards);
export const selectIsBoardPending = createSelector(selectBoardState, ({ isPending }) => isPending);
export const selectBoard = createSelector(selectBoardState, ({ board }) => board);
export const selectAllTasks = createSelector(selectBoardState, ({ search }) => search.tasks);
