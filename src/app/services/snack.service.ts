import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(
    private snackBar: MatSnackBar,
    private route: Router,
    private swUpdate: SwUpdate
  ) {}

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', { duration: 5000 });

    return this.snackBar._openedSnackBarRef
      ?.onAction()
      .pipe(tap(() => this.route.navigate(['/login'])))
      .subscribe();
  }

  updateVersion() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.snackBar.open(
          'New app update available. Load new version?',
          'OK',
          {
            duration: 5000,
          }
        );
        this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }
}
