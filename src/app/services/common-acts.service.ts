import { Injectable, signal } from '@angular/core';
import { DrawerState } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CommonActsService {
  public readonly drawer = signal<DrawerState>('close');
  public readonly error = signal<string | null>(null);
}
