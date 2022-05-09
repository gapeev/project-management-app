import { Task } from './board.model';

export interface DeleteDialogData {
  target: string;
  type: string;
}

export interface DeleteDialogResult {
  isConfirmed: boolean;
}

export interface CreateTaskData {
  columnId: string;
}

export interface UpdateTaskData {
  columnId: string;
  task: Task;
}
