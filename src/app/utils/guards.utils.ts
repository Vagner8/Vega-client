import {
  Exception,
  FractalModifiersNames,
  FractalPagesNames,
  PathParams,
} from '@types';
import { hasOwnProperty } from './functions.utils';

export const isException = (test: object): test is Exception =>
  hasOwnProperty(test, 'detail');

export const isPageName = (test: string): test is FractalPagesNames =>
  Object.values(FractalPagesNames).some(page => page === test);

export const isModifierName = (test: string): test is FractalModifiersNames =>
  Object.values(FractalModifiersNames).some(page => page === test);

export const isPathParam = (test: string): test is PathParams =>
  Object.values(PathParams).some(param => param === test);
