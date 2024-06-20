import { NavigationEnd } from '@angular/router';

export const isKeyof = <T extends object>(obj: T, key: string | number | symbol): key is keyof T =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const isNavigationEnd = (obj: object): obj is NavigationEnd => obj instanceof NavigationEnd;
