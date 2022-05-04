import { createReducer, on } from '@ngrx/store';
import { clearErrorMessage, setErrorMessage } from '@store/actions/error.actions';

export const initialState: string = '';

export const errorReducer = createReducer(
  initialState,
  on(setErrorMessage, (state, { message }): string => message),
  on(clearErrorMessage, (): string => '')
);
