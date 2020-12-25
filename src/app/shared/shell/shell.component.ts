import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements AfterViewInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 700px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('drawer')
  sideNav?: MatSidenav;

  sideNavAutoClose!: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  signout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
    this.sideNav?.close();
  }

  ngAfterViewInit() {
    this.sideNavAutoClose = this.isHandset$.subscribe((val) => {
      if (!val) {
        this.sideNav?.close();
      }
    });
  }

  ngOnDestroy() {
    this.sideNavAutoClose.unsubscribe();
  }
}
