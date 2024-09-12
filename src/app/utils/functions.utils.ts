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
