import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../../board.service';
import { DialogInput } from '../dialog.utils';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  form!: FormGroup; // Non-Null Assertion Operator used
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInput,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    private boardService: BoardService
  ) {
    console.log('TaskDialog-InputDataRecvd', data); // CONSOLE LOG

    this.form = this.fb.group({
      taskDescription: [data.task.description, [Validators.required]],
      label: [data.task.label, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  sendData() {
    const description: string = this.form.value.taskDescription;
    const label = this.form.value.label;

    const taskData: DialogInput = {
      task: {
        description: description,
        label: label,
      },
      isNew: this.data.isNew,
      boardId: this.data.boardId,
      taskIndex: this.data.taskIndex,
    };
    console.log('TaskDialog-OutputDataSent', taskData); // CONSOLE LOG
    this.dialogRef.close(taskData);
  }
}
