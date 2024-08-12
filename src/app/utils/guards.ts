import { Exception } from '@types';

export const isException = (obj: unknown): obj is Exception =>
  Object.prototype.hasOwnProperty.call(obj, 'detail');
