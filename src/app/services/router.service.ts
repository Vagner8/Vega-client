import { Injectable, signal } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { RsParams } from '@types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  navigationEnd$ = new Subject<RsParams>();
  params = signal<RsParams | null>(null);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) this.navigationEnd(event);
    });
  }

  private navigationEnd({ url }: NavigationEnd): void {
    const params = this.toParams(url);
    this.navigationEnd$.next(params);
    this.params.set(params);
  }

  private toParams(url: string): RsParams {
    const [page, modifier, ids] = url.split('/').slice(1);
    return {
      ids: ids && ids.split(':'),
      page,
      modifier,
    } as RsParams;
  }
}
