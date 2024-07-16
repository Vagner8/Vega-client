import { Injectable, signal } from '@angular/core';
import { Exception } from '@types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly error = signal<Exception | null>(null);
  readonly isFetching = signal<boolean>(false);
}
