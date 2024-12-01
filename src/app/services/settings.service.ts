import { Injectable, signal, WritableSignal } from '@angular/core';
import { IFractal, Indicators, Selects, Toggles } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  toggles = this.createSetting(Toggles, false);
  selects = this.createSetting(Selects, '');

  setSettings(settings: IFractal | null): void {
    if (!settings) return;
    settings.list().forEach(setting => {
      const { cursor } = setting;
      if (setting.has(Indicators.Toggle)) {
        this.toggles[cursor].set(setting.bool(Indicators.Toggle));
      }
      if (setting.has(Indicators.Select)) {
        this.selects[cursor].set(setting.array(Indicators.Select)[0]);
      }
    });
  }

  private createSetting<T>(settings: object, value: T): Record<string, WritableSignal<T>> {
    return Object.values(settings).reduce((acc: Record<string, WritableSignal<T>>, setting) => {
      acc[setting] = signal(value);
      return acc;
    }, {});
  }
}
