import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Board, Column, Task, TaskSearch, TaskUpdate } from '@shared/models/board.model';
import { UserInfo } from '@shared/models/user.model';
import { omit } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('/boards');
  }

  public getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(`/boards/${id}`);
  }

  public updateTasks(
    boardId: string,
    columnId: string,
    tasks: Task[],
    isNewColumn: boolean = false,
    movedTaskIndex: number = -1
  ): Observable<Task[]> {
    return forkJoin(
      tasks.map((task, index) => {
        const actualColumnId: string =
          isNewColumn && index === movedTaskIndex ? task.prevColumnId ?? columnId : columnId;
        return this.http.put<Task>(
          `/boards/${boardId}/columns/${actualColumnId}/tasks/${task.id}`,
          {
            title: task.title,
            description: task.description,
            userId: task.userId,
            order: task.order,
            done: task.done,
            boardId,
            columnId,
          }
        );
      })
    );
  }

  public updateColumns(boardId: string, columns: Column[]): Observable<Column[]> {
    return forkJoin(
      columns.map((column) => {
        return this.http.put<Column>(`/boards/${boardId}/columns/${column.id}`, {
          title: column.title,
          order: column.order,
        });
      })
    );
  }

  public deleteTask(boardId: string, columnId: string, taskId: string): Observable<void> {
    return this.http.delete<void>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  public deleteColumn(boardId: string, columnId: string): Observable<void> {
    return this.http.delete<void>(`/boards/${boardId}/columns/${columnId}`);
  }

  public createBoard(title: string, description: string): Observable<void> {
    return this.http.post<void>('/boards', { title, description });
  }

  public deleteBoard(boardId: string): Observable<void> {
    return this.http.delete<void>(`/boards/${boardId}`);
  }

  public createColumn(boardId: string, title: string, order: number): Observable<void> {
    return this.http.post<void>(`/boards/${boardId}/columns`, { title, order });
  }

  public getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('/users');
  }

  public createTask(
    boardId: string,
    columnId: string,
    task: Omit<Task, 'id' | 'files'>
  ): Observable<void> {
    return this.http.post<void>(`/boards/${boardId}/columns/${columnId}/tasks`, task);
  }

  public updateTask(task: TaskUpdate): Observable<void> {
    return this.http.put<void>(
      `/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}`,
      omit(task, 'id')
    );
  }

  public updateColumn(boardId: string, column: Omit<Column, 'tasks'>): Observable<void> {
    return this.http.put<void>(`/boards/${boardId}/columns/${column.id}`, omit(column, 'id'));
  }

  public getAllTasks(): Observable<TaskSearch[]> {
    return this.http.get<TaskSearch[]>('/search/tasks');
  }

  constructor(private http: HttpClient) {}
}
