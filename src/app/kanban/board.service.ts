import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { switchMap, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { Board, Task } from './board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Create new board for the current user
   */
  async createBoard(title: string, priority: number) {
    const user = await this.afAuth.currentUser;
    const id = uuidv4();
    return this.db
      .collection('boards')
      .doc(id)
      .set({
        boardId: id,
        title: title,
        priority: priority,
        uid: user?.uid,
        tasks: [{ description: 'Hello!', label: 'yellow' }],
      });
  }

  /**
   * Delete Board
   */
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  /**
   * Update the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  /**
   * Remove Task
   */
  removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }

  /**
   * Add Task
   */
  addTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayUnion(task),
      });
  }

  /**
   * Get User Boards
   */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .snapshotChanges()
            .pipe(
              map((snaps) =>
                snaps.map((snap) => {
                  return <Board>{
                    id: snap.payload.doc.id,
                    ...snap.payload.doc.data(),
                  };
                })
              )
            );
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    const batch = this.db.firestore.batch();
    const refs: any[] = boards.map(
      (b) => this.db.collection('boards').doc(b.boardId).ref
    );
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Obtain length of task array in a board
   */
  taskLength(boardId: string) {
    return this.db
      .collection<Board>('boards')
      .doc(boardId)
      .snapshotChanges()
      .pipe(
        map((snap) => {
          const boardData = snap.payload.data();
          const taskLength = boardData?.tasks.length;
          if (typeof taskLength === 'number' && taskLength > 0) {
            return taskLength;
          } else {
            return 0;
          }
        })
      );
  }
}
