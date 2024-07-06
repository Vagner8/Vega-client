import { WritableSignal } from '@angular/core';
import { isException, isKeyof } from './guards';
import { ControlsDto, Exception, Indicator } from '@types';
import { HttpErrorResponse } from '@angular/common/http';

export const setSignals = <T extends object, WS>(
  value: T,
  signals: Record<keyof T, WritableSignal<WS>>,
): void => {
  Object.entries(value).forEach(([key, value]) => {
    if (!isKeyof(signals, key)) return;
    signals[key].set(value);
  });
};

export const ex = (error: HttpErrorResponse): Exception => {
  const ex: Exception = {
    type: 'Node',
    title: 'Node',
    status: 500,
    detail: error.message,
    instance: 'Node',
  };
  return isException(error.error) ? error.error : ex;
};