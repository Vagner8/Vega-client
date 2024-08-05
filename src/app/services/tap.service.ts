import { Injectable, signal } from '@angular/core';
import { MODIFIER_TAPS, PAGE_TAPS, SETTINGS_TAPS } from '@constants';
import { TapConfigPage, TapConfigUnion, TapModifiersNames, TapTypes } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  private configs: Record<TapTypes, TapConfigUnion[]> = {
    pages: PAGE_TAPS,
    modifiers: MODIFIER_TAPS,
    settings: SETTINGS_TAPS,
  };

  data = signal<TapConfigUnion[]>([]);

  addPage(page: TapConfigPage): void {
    this.configs.pages.unshift(page);
  }

  set(name: TapTypes): void {
    this.data.set(this.configs[name]);
  }

  activateModifiers(names: TapModifiersNames[]) {
    if (this.data()[0].type !== 'modifiers') return;
    this.data.update((data) =>
      data.map((tap) =>
        names.some((name) => name === tap.name)
          ? { ...tap, disabled: false }
          : { ...tap, disabled: true },
      ),
    );
  }
}
