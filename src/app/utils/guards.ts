import { PAGES } from '@constants';
import { Exception, FractalPagesNames } from '@types';
import { hasOwnProperty } from './functions';

export const isException = (test: object): test is Exception => hasOwnProperty(test, 'detail');

export const isFractalPagesNames = (test: string): test is FractalPagesNames =>
  PAGES.some((page) => page === test);
