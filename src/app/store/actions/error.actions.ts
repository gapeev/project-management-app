import { createAction, props } from '@ngrx/store';

export const setErrorMessage = createAction(
  '[App] Set Error Message',
  props<{ message: string }>()
);

export const clearErrorMessage = createAction('[App] Clear Error Message');
