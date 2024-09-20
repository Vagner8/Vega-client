import { Click, Exception, Modifiers, Pages, Roots } from '@types';
import { hasOwnProperty } from './functions.utils';

export const isException = (test: object): test is Exception => hasOwnProperty(test, 'detail');

export const isPageName = (test: string): test is Pages => isEnum(test, Pages);

export const isModifierName = (test: string): test is Modifiers => isEnum(test, Modifiers);

export const isClickType = (test: unknown): test is Click => isEnum(test, Click);

export const isRoots = (test: string): test is Roots => isEnum(test, Roots);

export const isEnum = (test: unknown, obj: object): boolean =>
  Object.values(obj).some(param => param === test);

export const isString = (test: unknown): test is string => typeof test === 'string';
