import { PAGES } from '@constants';
import { Exception, FractalModifiersNames, FractalPagesNames } from '@types';
import { hasOwnProperty } from './functions.utils';

export const isException = (test: object): test is Exception =>
  hasOwnProperty(test, 'detail');

export const isPageName = (test: string): test is FractalPagesNames =>
  PAGES.some(page => page === test);

export const isModifierName = (test: string): test is FractalModifiersNames =>
  PAGES.some(page => page === test);
