import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  toggles = signal<Record<string, boolean>>({});
  selects = signal<Record<string, string[]>>({});
}
