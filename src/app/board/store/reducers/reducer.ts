import { createAction, props } from "@ngrx/store";

export const getTasks = createAction('[TASKS PAGE] GET ALL TASKS');

export const getTask = createAction('[TASKS PAGE] GET TASK BY ID',
  props<{ taskID: number }>())

export const createTask = createAction('[TASKS PAGE] CREATE NEW TASK',
  props<{ task: Task }>())

export const completeTask = createAction('[TASKS PAGE] COMPLETE TASK',
  props<{ task: Task }>())

export const updateTask = createAction('[TASKS PAGE] UPDATE TASK',
  props<{ task: Task }>())

export const deleteTask = createAction('[TASKS PAGE] DELETE TASK',
  props<{ task: Task }>())
