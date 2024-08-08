import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Segments, SegmentsTuple, TapModifiersNames, TapPagesNames, TapTypes } from '@types';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  params = signal<Segments>({
    ids: null,
    page: null,
    type: null,
    modifier: null,
  });

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.params().type) return;
        this.setParamsFromUrl(event.url);
      }
    });
  }

  navigate(
    type: TapTypes | null = null,
    page: TapPagesNames | null = null,
    modifier: TapModifiersNames | null = null,
    ids: string | null = null,
  ): void {
    this.params.set({ type, page, modifier, ids });
    this.router.navigate([type, page, modifier, ids].filter(Boolean));
  }

  private setParamsFromUrl(url: string) {
    const [type = null, page = null, modifier = null, ids = null] = url
      .split('/')
      .slice(1) as SegmentsTuple;
    this.params.set({ type, page, modifier, ids });
  }
}
