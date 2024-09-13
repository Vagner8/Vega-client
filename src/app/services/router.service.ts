import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { QueryParams } from '@types';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  params = signal<string[]>([]);
  queryParams = signal<QueryParams>({
    ids: null,
  });

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.params()[0]) return;
        this.params.set(event.url.split('/').filter(Boolean));
      }
    });
  }

  navigate(params: string[]): void {
    this.params.set(params);
    this.router.navigate(params);
  }
}
