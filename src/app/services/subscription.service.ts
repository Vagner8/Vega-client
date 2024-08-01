/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

function AddSubscription(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (this: SubscriptionService, ...args: Subscription[]) {
    const className = this.constructor.name;
    if (!this.subscriptions[className]) {
      this.subscriptions[className] = [];
    }
    const [subscription] = args;
    this.subscriptions[className].push(subscription);
    return originalMethod.apply(this, args);
  };
}

function CleanSubscription(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (this: SubscriptionService) {
    const className = this.constructor.name;
    if (this.subscriptions && this.subscriptions[className]) {
      this.subscriptions[className].forEach((s: Subscription) => s.unsubscribe());
    }
    return originalMethod.apply(this);
  };
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  subscriptions: Record<string, Subscription[]> = {};

  @AddSubscription
  add(subscription: Subscription): void {}

  @CleanSubscription
  clean(): void {}
}
