import { Injectable } from '@angular/core';
import { Unsubscriber } from '@types';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeService {
  init(): Unsubscriber {
    return {
      subscriptions: [],
      set(subscription: Subscription): void {
        this.subscriptions.push(subscription);
      },
      clear(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
      },
    };
  }
}
