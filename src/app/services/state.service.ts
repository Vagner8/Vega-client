import { Injectable, signal } from '@angular/core';
import { Exception } from '@types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  error = signal<Exception | null>(null);
}
