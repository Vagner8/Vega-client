import { computed, Injectable, signal } from '@angular/core';
import { ClickType } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  clickType = signal<ClickType>(ClickType.Hold);
  isHold = computed(() => this.clickType() === ClickType.Hold);
}
