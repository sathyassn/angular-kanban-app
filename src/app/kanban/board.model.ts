export class Board {
  id?: string;
  title: string = '';
  priority: number = NaN;
  tasks: Task[] = [];
}

export interface Task {
  description: string;
  label: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}
