import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { QueryParams, Segments } from '@types';
import { isModifierName, isPageName } from '@utils';

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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.segments().page) return;
        this.setSegments(event.url);
      }
    });
  }

  navigate(page: string, modifier: string = ''): void {
    const segments = this.getSegments(page, modifier);
    this.segments.set(segments);
    this.router.navigate(Object.values(segments).filter(Boolean));
  }

  private getSegments(page: string, modifier: string): Segments {
    return {
      page: isPageName(page) ? page : null,
      modifier: isModifierName(modifier) ? modifier : null,
    };
  }

  private setSegments(pathname: string): void {
    const [page = null, modifier = null] = pathname.split('/').filter(Boolean);
    this.segments.set({ page, modifier } as Segments);
  }
}
