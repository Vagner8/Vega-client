import { Click, Exception, Modifiers, Pages } from '@types';
import { hasOwnProperty } from '@utils';

export const isException = (test: object): test is Exception => hasOwnProperty(test, 'detail');

export const isEnum = (test: unknown, obj: object): boolean =>
  Object.values(obj).some(param => param === test);

export const isClick = (test: string): test is Click => isEnum(test, Click);

export const isPageTap = (test: string): test is Pages => isEnum(test, Pages);

export const isModifierTap = (test: string): test is Modifiers => isEnum(test, Modifiers);

export const isTypeof = <T extends object>(obj: unknown, key: PropertyKey): obj is T =>
  typeof obj === 'object' && obj !== null && hasOwnProperty(obj, key);

export const isKeyof = <T extends object>(obj: T, key: PropertyKey): key is keyof T =>
  hasOwnProperty(obj, key);
