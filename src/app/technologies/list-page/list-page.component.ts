import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeoService } from '../../services/seo.service';
import { Technology } from '../technology.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  technologies: Observable<Technology[]> = of([]);

  constructor(private db: AngularFirestore, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Technologies List',
      description: 'A list of web technologies used in this demo application',
    });

    this.technologies = this.db
      .collection<Technology>('technologies')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            return <Technology>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data(),
            };
          });
        })
      );
  }
}
