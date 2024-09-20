import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeService {
  counter = 0;
  subscriptions: Record<number, Subscription[]> = {};

  constructor() {}

  register(): number {
    return ++this.counter;
  }

  set(subscription: Subscription, key: number): void {
    if (this.subscriptions[key]) {
      this.subscriptions[key].push(subscription);
    } else {
      this.subscriptions[key] = [subscription];
    }
  }

  unsubscribe(key: number): void {
    this.subscriptions[key].forEach(subscription => subscription.unsubscribe());
  }
}
