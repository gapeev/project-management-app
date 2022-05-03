import {createAction, props} from "@ngrx/store";

export const getTasks = createAction('[TASKS PAGE] GET ALL TASKS');
export const getTask = createAction('[TASKS PAGE] GET TASK BY ID',
  props<{ taskID: number }>())
export const createTask = createAction('[TASKS PAGE] GET TASK BY ID',
  props<{ task: Task }>()
)
