import { computed, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Params, Queries, WSS } from '@types';
import { stringToArray } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class NavigateService implements Params {
  Taps: WSS = signal(null);
  Page: WSS = signal(null);
  Items: WSS = signal(null);
  Manager: WSS = signal(null);
  Modifier: WSS = signal(null);

  itemList = computed(() => stringToArray(this.Items()));

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.parseParams(event.url);
    });
  }

  toItems(items: string | null): void {
    this.merge(Queries.Items, items);
  }

  toTaps(tap: string): Promise<boolean> {
    return this.merge(Queries.Taps, tap);
  }

  toPage(page: string): void {
    this.router.navigate([page, ''], {
      queryParams: { [Queries.Items]: null },
      queryParamsHandling: 'merge',
    });
  }

  toManager(manager: string): void {
    this.merge(Queries.Manager, manager);
  }

  toModifier(modifier: string): void {
    this.router.navigate([this.Page(), modifier], { queryParamsHandling: 'merge' });
  }

  private merge(key: Queries, value: string | null): Promise<boolean> {
    return this.router.navigate([], {
      queryParams: { [key]: value },
      queryParamsHandling: 'merge',
    });
  }

  private parseParams(url: string) {
    const { pathname, search } = new URL(url, window.location.origin);
    const params = new URLSearchParams(search);
    const [Page, Modifier] = pathname.split('/').filter(Boolean);
    Object.values(Queries).forEach(query => this[query].set(params.get(query)));
    this.Page.set(Page);
    this.Modifier.set(Modifier);
  }
}
