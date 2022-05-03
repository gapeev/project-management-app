export class TaskModel implements Task {
  constructor(
    public id: number = 0,
    public action: string = '',
    public priority: number,
    public eatHours: number,
    public actHours: number,
    public done?: boolean,
  ) {
    this.actHours = actHours || 0;
    this.done = done || false;
  }
}

export interface Task {
  id?: number;
  action?: string;
  priority?: number;
  eatHours?: number;
  actHours?: number;
  done?: boolean;
}
