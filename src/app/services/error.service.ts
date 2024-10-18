import { Injectable, signal } from '@angular/core';
import { Exception } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error = signal<Exception | null>(null);
}
