import { InjectionToken, Provider } from '@angular/core';

export interface TokenApi {
  unit: string;
  control: string;
}

const useValue: TokenApi = {
  unit: 'https://localhost:7002/api/unit',
  control: 'https://localhost:7002/api/control',
};

export const TOKEN_API = new InjectionToken<TokenApi>('TOKEN_API');

export const provideTokenApi = (): Provider => ({
  provide: TOKEN_API,
  useValue,
});
