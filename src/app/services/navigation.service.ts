import { Injectable, signal } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Address } from '@types';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  address = signal<Address>({ page: '', action: '' });

  constructor(private router: Router) {
    this.router.events.subscribe(this.on);
  }

  private toAddress(url: string): Address {
    const [_, page, action] = url.split('/');
    return { page, action };
  }

  private on = (event: Event) => {
    if (event instanceof NavigationEnd) {
      this.address.set(this.toAddress(event.url));
    }
  };
}
