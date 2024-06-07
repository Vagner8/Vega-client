import { WritableSignal } from '@angular/core';
import { isKeyof } from './guards';

export const setSignals = <T extends object, WS>(
  value: T,
  signals: Record<keyof T, WritableSignal<WS>>,
): void => {
  Object.entries(value).forEach(([k, v]) => {
    if (!isKeyof(signals, k)) return;
    signals[k].set(v);
  });
};
