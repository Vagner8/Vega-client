import { PAGES } from '@constants';
import { Exception, FractalModifiersNames, FractalPagesNames } from '@types';
import { hasOwnProperty } from './functions';

export const isException = (test: object): test is Exception =>
  hasOwnProperty(test, 'detail');

export const isPagesNames = (test: string): test is FractalPagesNames =>
  PAGES.some(page => page === test);

export const isModifiersNames = (test: string): test is FractalModifiersNames =>
  PAGES.some(page => page === test);
