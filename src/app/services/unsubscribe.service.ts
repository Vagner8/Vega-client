import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeService {
  subscriptions: Record<string, Subscription[]> = {};

  set(uniqueKey: string, subscription: Subscription): void {
    if (this.subscriptions[uniqueKey]) {
      this.subscriptions[uniqueKey].push(subscription);
    } else {
      this.subscriptions[uniqueKey] = [subscription];
    }
  }

  remove(uniqueKey: string): void {
    this.subscriptions[uniqueKey].forEach(subscription => subscription.unsubscribe());
  }
}
