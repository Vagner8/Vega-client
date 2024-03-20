import { Injectable, signal } from '@angular/core';
import { ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly error = signal<string | null>(null);
  readonly drawerOpened = signal<boolean>(false);
  readonly paramMap = signal<ParamMap | null>(null);
}
