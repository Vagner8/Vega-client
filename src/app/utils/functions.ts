import { WritableSignal } from '@angular/core';
import { isKeyof } from './guards';

export const setSignals = <T extends object, WS>(
  value: T,
  signals: Record<keyof T, WritableSignal<WS>>,
): void => {
  Object.entries(value).forEach(([key, value]) => {
    if (!isKeyof(signals, key)) return;
    signals[key].set(value);
  });
};
