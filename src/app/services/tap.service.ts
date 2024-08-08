import { Injectable, signal } from '@angular/core';
import { MODIFIER_TAPS, PAGE_TAPS, SETTINGS_TAPS } from '@constants';
import { TapConfigPage, TapConfigs } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  data = signal<TapConfigs>({
    Page: PAGE_TAPS,
    Modifier: MODIFIER_TAPS,
    Setting: SETTINGS_TAPS,
  });

  addPage(page: TapConfigPage): void {
    this.data.update((state) => ({ ...state, Page: [page, ...state.Page] }));
  }
}
