import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTap, ActionTaps, PageTap, PageTaps, ToolbarTap, ToolbarTaps } from '@taps';
import {
  TapPlaces,
  Taps,
  TapRec,
  TapType,
  Address,
  TapServiceProps,
} from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  data: Taps = {
    pages: [],
    actions: [],
    toolbar: [],
    settings: [],
  };
  rec: TapRec = {
    pages: signal(null),
    actions: signal(null),
    toolbar: signal(null),
    settings: signal(null),
  };
  address: Address = {
    page: signal(null),
    action: signal(null),
  };

  constructor(private router: Router) {
    const sp: TapServiceProps = {
      rec: this.rec,
      router: this.router,
      address: this.address,
    };
    this.data.pages = PageTaps.map((p) => new PageTap({ ...p, ...sp }));
    this.data.actions = ActionTaps.map((p) => new ActionTap({ ...p, ...sp }));
    this.data.toolbar = ToolbarTaps.map((p) => new ToolbarTap({ ...p, ...sp }));
  }

  find(place: TapPlaces, name: string): TapType | undefined {
    return this.data[place].find((t) => t.name === name);
  }
}
