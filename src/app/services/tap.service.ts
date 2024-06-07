import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageTap, createModifierTaps, createToolbarTaps } from '@taps';
import { ToolbarTaps, RecTapSignals, ModifierTaps, ControlDto, TapServices } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  rec: RecTapSignals;
  toolbar: ToolbarTaps;
  modifiers: ModifierTaps;
  private _services: TapServices;

  constructor(private _router: Router) {
    this.rec = this._createRec();
    this._services = { rec: this.rec, router: this._router };
    this.modifiers = createModifierTaps(this._services);
    this.toolbar = createToolbarTaps(this._services);
  }

  addPage({ data, indicator }: ControlDto): void {
    const tap = new PageTap(data, { services: this._services });
    const pages = this.modifiers.pages;
    pages.obj[indicator] = tap;
    pages.list.push(tap);
  }

  private _createRec(): RecTapSignals {
    return {
      page: signal(null),
      action: signal(null),
      toolbar: signal(null),
    };
  }
}
