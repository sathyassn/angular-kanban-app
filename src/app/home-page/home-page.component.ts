import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Home',
      description:
        'Kanban App built using Angular, Firebase, NodeJS, Google Cloud',
      image:
        'https://firebasestorage.googleapis.com/v0/b/angularfire-my-app.appspot.com/o/kanban%2Fkanban-icon-96x96.png?alt=media&token=a44bf284-12d1-465b-a8a6-811a58f3af76',
    });
  }
}
