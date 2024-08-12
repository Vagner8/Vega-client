import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { QueryParams, Segments, TapModifiersNames, TapPagesNames } from '@types';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  segments = signal<Segments>({
    page: null,
    modifier: null,
  });
  queryParams = signal<QueryParams>({
    ids: null,
  });

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.segments().page) return;
        this.setSegments(event.url);
      }
    });
  }

  navigate(page: TapPagesNames | null = null, modifier: TapModifiersNames | null = null): void {
    this.segments.set({ page, modifier });
    this.router.navigate([page, modifier].filter(Boolean));
  }

  private setSegments(pathname: string): void {
    const [page = null, modifier = null] = pathname.split('/').filter(Boolean);
    this.segments.set({ page, modifier } as Segments);
  }
}
