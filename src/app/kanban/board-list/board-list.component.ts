import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog/board-dialog.component';
import { SeoService } from '../../services/seo.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  sub: Subscription = new Subscription();
  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 700px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    private seo: SeoService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.sub = this.boardService.getUserBoards().subscribe((boards) => {
      this.boards = boards;
    });
    this.seo.generateTags({
      title: 'Boards',
      description: 'Kanban boards of the user',
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
