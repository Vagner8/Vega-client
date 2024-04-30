import { ResponseDto } from './http.types';
import { Taps } from './tap.types';

export const isResponseDto = <T>(obj: unknown): obj is ResponseDto<T> =>
  obj instanceof Object && Object.prototype.hasOwnProperty.call(obj, 'data');
