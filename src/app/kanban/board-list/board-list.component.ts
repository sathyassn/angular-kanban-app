import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  sub: Subscription = new Subscription();

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sub = this.boardService.getUserBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(BoardDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((title) => {
      if (typeof title === 'string') {
        const boardTitle: string = title;
        const priority = this.boards.length;
        this.boardService.createBoard(boardTitle, priority);
      }
    });
  }
}
