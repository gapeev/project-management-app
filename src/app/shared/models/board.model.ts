export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  userId: string;
  order: number;
  files: File[];
  prevColumnId?: string;
}

export interface TaskUpdate {
  id: string;
  title: string;
  description: string;
  done: boolean;
  order: number;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface TaskSearch extends TaskUpdate {
  user: {
    name: string;
  };
}

export interface File {
  filename: string;
  fileSize: number;
}

export interface Search {
  type: 'title' | 'description' | 'user';
  query: string;
  tasks: TaskSearch[];
}
