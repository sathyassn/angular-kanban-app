import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from '../../board.model';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss'],
})
export class BoardDialogComponent implements OnInit {
  form!: FormGroup; // Non-Null Assertion Operator used

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Board,
    private dialogRef: MatDialogRef<BoardDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendData() {
    const boardTitle: string = this.form.get('title')?.value;
    this.dialogRef.close(boardTitle);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendData();
    }
  }
}
