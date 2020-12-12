import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private seo: SeoService) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Authentication ',
      description: 'User authentication page',
    });
  }

  signOut() {
    this.afAuth.signOut();
  }
}
