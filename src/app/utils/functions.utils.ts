import { isException } from './guards.utils';
import { Exception } from '@types';
import { HttpErrorResponse } from '@angular/common/http';

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

export const hasOwnProperty = (obj: object, property: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, property);

export const isEmpty = (iterator: Set<unknown> | unknown[]): boolean => {
  if (iterator instanceof Set) {
    return iterator.size === 0;
  }
  if (iterator instanceof Array) {
    return iterator.length === 0;
  }
  return false;
};

export const stringToArray = (str: string | null, splitter: string = ':'): string[] =>
  str?.split(splitter).filter(Boolean) || [];

export const setToString = (set: Set<string>, splitter: string = ':'): string =>
  Array.from(set).join(splitter);
