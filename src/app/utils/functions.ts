import { WritableSignal } from '@angular/core';
import { isKeyof } from '../types/guards';

export const setSignals = <T extends {}>(
  value: T,
  signals: Record<keyof T, WritableSignal<any>>
): void => {
  Object.entries(value).forEach(([k, v]) => {
    if (!isKeyof(signals, k)) return;
    signals[k].set(v);
  });
};
