import { Injectable, signal } from '@angular/core';
import { TAPS } from '@constants';
import { TapConfigPage, TapConfigs, TapManagerTypeClick } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  data = signal<TapConfigs>({
    pages: TAPS.PAGES,
    modifiers: TAPS.MODIFIERS,
    settings: TAPS.SETTINGS,
  });
  manager = signal<TapManagerTypeClick>(3);

  addPage(page: TapConfigPage): void {
    this.data.update((state) => ({ ...state, pages: [page, ...state.pages] }));
  }
}
