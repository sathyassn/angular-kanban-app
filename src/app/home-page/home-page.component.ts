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
        'https://firebasestorage.googleapis.com/v0/b/angularfire-my-app.appspot.com/o/kanban%2Fkanban-black-icon.png?alt=media&token=0e21f0ea-fa6b-4a14-b27d-0467a3e6e51b',
    });
  }
}
