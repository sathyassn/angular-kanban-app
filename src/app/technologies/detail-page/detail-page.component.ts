import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SeoService } from '../../services/seo.service';
import { Technology } from '../technology.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  techId: string = '';
  technology!: Observable<Technology>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.techId = <string>this.route.snapshot.paramMap.get('techId');

    this.technology = this.db
      .doc<Technology>(`technologies/${this.techId}`)
      .snapshotChanges()
      .pipe(
        map((snap) => {
          return <Technology>{
            id: snap.payload.id,
            ...snap.payload.data(),
          };
        }),
        tap((tech) => {
          this.seo.generateTags({
            title: tech.name,
            description: tech.description,
            image: tech.imageLink,
          });
        })
      );
  }
}
