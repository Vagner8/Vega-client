import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FractalType, IdSet, QueryParams, Segments } from '@types';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  ids = signal<string[]>([]);
  params = signal<string[]>([]);
  manager = signal<string | null>(null);

  url = signal<string | null>(null);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const { ids, params, manager } = this.parse(event.url);
        this.ids.set(ids);
        this.params.set(params);
        this.manager.set(manager[0]);
      }
    });
  }

  navigateByParam(param: string, type: FractalType): void {
    switch (type) {
      case FractalType.Pages:
        this.params.set([param]);
        this.router.navigate([param], { queryParams: { [QueryParams.Manager]: this.manager() } });
        break;
      case FractalType.Modifiers:
        this.params.set([this.params()[0], param]);
        this.router.navigate([this.params()[0], param], { queryParamsHandling: 'merge' });
        break;
    }
  }

  navigateById(id: string): void {
    const { str, arr } = this.idSet(id);
    this.ids.set(arr);
    this.navigateByQueryParams(QueryParams.Ids, str);
  }

  navigateByManager(clickType: string): void {
    this.manager.set(clickType);
    this.navigateByQueryParams(QueryParams.Manager, clickType);
  }

  private navigateByQueryParams(param: QueryParams, value: string | null): void {
    this.router.navigate(this.params(), {
      queryParams: { [param]: value },
      queryParamsHandling: 'merge',
    });
  }

  private idSet(id: string): IdSet {
    const set = new Set<string>(this.ids());
    if (set.has(id)) set.delete(id);
    else set.add(id);
    const arr = set.size !== 0 ? Array.from(set) : null;
    return { str: arr && arr.join(':'), arr: arr || [] };
  }

  private parse(url: string): Segments {
    const { pathname, search } = new URL(url, window.location.origin);
    const get = (param: QueryParams) =>
      new URLSearchParams(search).get(param)?.split(':').filter(Boolean) || [];
    return {
      ids: get(QueryParams.Ids),
      params: pathname.split('/').filter(Boolean),
      manager: get(QueryParams.Manager),
    };
  }
}
