import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board = new Board();

  taskMoved!: Task;
  taskLength: number = NaN;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  taskDrop(event: CdkDragDrop<Board>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
      this.boardService.updateTasks(
        event.container.data.boardId,
        event.container.data.tasks
      );
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
      this.boardService.updateTasks(
        event.previousContainer.data.boardId,
        event.previousContainer.data.tasks
      );

      this.boardService.updateTasks(
        event.container.data.boardId,
        event.container.data.tasks
      );
    }
  }

  openTaskDialog(task?: Task, taskIndex?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';

    if (task) {
      dialogConfig.data = {
        task: { ...task },
        isNew: false,
        boardId: this.board.boardId,
        taskIndex: taskIndex,
      };
    } else {
      dialogConfig.data = { task: { label: 'purple' }, isNew: true };
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((taskData) => {
      if (taskData) {
        if (taskData.isNew && this.board.boardId) {
          this.boardService.updateTasks(this.board.boardId, [
            ...this.board.tasks,
            taskData.task,
          ]);
        } else if (this.board.boardId) {
          const update = this.board.tasks;
          update.splice(taskData.taskIndex, 1, taskData.task);
          this.boardService.updateTasks(this.board.boardId, this.board.tasks);
        }
      }
    });
  }

  deleteBoard() {
    if (this.board.boardId) {
      this.boardService.deleteBoard(this.board.boardId);
    }
  }
}
