import { Subscription } from 'rxjs';

export class Unsubscriber {
  subscriptions: Subscription[] = [];

  set(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  clear(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
