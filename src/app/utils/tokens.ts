import { InjectionToken, Provider } from '@angular/core';

export interface TOKENS_TYPE {
  api: string;
}

export const TOKENS = new InjectionToken<TOKENS_TYPE>('TOKENS');

export const provideTokens = (): Provider => ({
  provide: TOKENS,
  useValue: {
    api: `https://localhost:7002/api/matrix?&matrixId=55ffab63-37d5-4dd9-a9f0-d4e32b29d7fa`,
  },
});
