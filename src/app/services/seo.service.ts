import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  generateTags({ title = '', description = '', image = '' }) {
    this.title.setTitle(`Kanban | ${title}`);
    this.meta.addTags([
      // meta tag
      { name: 'description', content: description },
      // Open Graph
      { name: 'og:url', content: ` ${this.router.url}` },
      { name: 'og:title', content: `Kanban | ${title}` },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },

      // Twitter Card
      { name: 'twitter:title', content: `Kanban | ${title}` },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@sathyassn' },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ]);
  }
}
