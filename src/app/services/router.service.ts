import { Injectable, signal } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { FractalsNames, TapModifiersNames } from '@types';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  fractal = signal<FractalsNames | null>(null);
  modifier = signal<TapModifiersNames | null>(null);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) this.navigationEnd(event);
    });
  }

  private navigationEnd(event: NavigationEnd): void {
    const [, fractal, modifier] = event.url.split('/');
    this.fractal.set(fractal as FractalsNames);
    this.modifier.set(modifier as TapModifiersNames);
  }
}
