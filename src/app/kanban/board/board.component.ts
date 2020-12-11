import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  @Input() board!: Board; // Non-Null Assertion Operator used!

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  async taskDrop(event: CdkDragDrop<string[]>) {
    if (this.board?.id) {
      moveItemInArray(
        this.board.tasks,
        event.previousIndex,
        event.currentIndex
      );
      this.boardService.updateTasks(this.board.id, this.board.tasks);
    }
  }

  openTaskDialog(task?: Task, taskIndex?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';

    if (task) {
      dialogConfig.data = {
        task: { ...task },
        isNew: false,
        boardId: this.board.id,
        taskIndex: taskIndex,
      };
      console.log('BoardComponent-UpdateTask-DataSent', dialogConfig); // CONSOLE LOG
    } else {
      dialogConfig.data = { task: { label: 'purple' }, isNew: true };
      console.log('BoardComponent-NewTask-DataSent', dialogConfig); // CONSOLE LOG
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((taskData) => {
      console.log('BoardComponent-DataReceivedBack', taskData); // CONSOLE LOG
      if (taskData) {
        if (taskData.isNew && this.board.id) {
          this.boardService.updateTasks(this.board.id, [
            ...this.board.tasks,
            taskData.task,
          ]);
        } else if (this.board.id) {
          const update = this.board.tasks;
          update.splice(taskData.taskIndex, 1, taskData.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }
}
