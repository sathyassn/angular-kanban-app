import { Component, OnInit } from '@angular/core';
import { SnackService } from './services/snack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kanban-app';

  constructor(private snack: SnackService) {}

  ngOnInit() {
    this.snack.updateVersion();
  }
}
