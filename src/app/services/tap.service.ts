import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Tap,
  TapOptions,
  TapState,
  Taps,
  TapProps,
  PageTypeName,
} from '@types';
import { tapConfig, tapDataConfig, tapRecConfig } from 'app/config';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  data = tapDataConfig;
  rec = tapRecConfig;

  constructor(private router: Router) {
    this.onInit();
  }

  find(place: keyof Taps, name: string) {
    return this.data[place].find((t) => t.name === name);
  }

  private onInit() {
    Object.entries(tapConfig).forEach(([place, taps]) => {
      this.data[place as keyof Taps] = taps.map((t) =>
        this.create({ ...t, place: place as keyof Taps })
      );
    });
  }

  private create = ({ name, place, state, options }: TapProps) => {
    const initialState = { ...this.defaultState(), ...state };
    const initialOptions = { ...this.defaultOptions(), ...options };
    const tap: Tap = {
      name,
      place,
      signal: signal(initialState),
      options: initialOptions,

      update(value: Partial<TapState>) {
        this.signal.update((state) => ({ ...state, ...value }));
      },

      reset() {
        this.signal.set(initialState);
      },

      restore(key) {
        this.signal.update((state) => ({ ...state, [key]: initialState[key] }));
      },

      navigate: () => {
        this.rec[place] = name;
        if (place === 'Pages') this.rec.Settings = this.rec.Actions = '';
        if (place === 'Actions') this.rec.Settings = '';
        if (place === 'Settings') this.rec.Actions = '';
        if (!initialOptions.navigation) return;
        const page = this.rec.Pages || PageTypeName.Matrices;
        const action = this.rec.Actions || this.rec.Settings;
        if (action) this.router.navigate([page, action]);
        else this.router.navigate([page]);
      },
    };
    return tap;
  };

  private defaultState() {
    return {
      icon: 'apps',
      visibility: 'visible',
      disabled: false,
    } as TapState;
  }

  private defaultOptions() {
    return { confirm: false, navigation: true } as TapOptions;
  }
}
