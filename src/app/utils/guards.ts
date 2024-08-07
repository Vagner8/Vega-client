import { Exception, FractalsNames } from '@types';
import { FRACTAL_NAMES } from '@constants';

export const isKeyof = <T extends object>(obj: T, key: string | number | symbol): key is keyof T =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const isException = (obj: unknown): obj is Exception =>
  Object.prototype.hasOwnProperty.call(obj, 'detail');

export const isFractalName = (value: unknown): value is FractalsNames =>
  FRACTAL_NAMES.some((name) => name === value);
