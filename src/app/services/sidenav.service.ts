import { Injectable, computed, signal } from '@angular/core';
import { SidenavState } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  state = signal<SidenavState>('Close');
  isOpened = computed<boolean>(() => this.state() === 'Open');
}
