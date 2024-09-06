import { Injectable, signal } from '@angular/core';
import { ManagerClickType } from 'app/types/tap.types';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  clickType = signal<ManagerClickType>('hold');
}
