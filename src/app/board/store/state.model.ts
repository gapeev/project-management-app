import { ITask, TaskModel } from "../models/task.model";

export interface TaskState {
  tasks: ITask[];
}

export const initialTaskState: TaskState = {
  tasks: [
    new TaskModel(1, 'test', 1, 1, 1, false)
  ]
}
