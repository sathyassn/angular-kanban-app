import { Task } from '../board.model';

export interface DialogInput {
  task: Task;
  isNew: boolean;
  boardId?: string;
  taskIndex?: number;
}
