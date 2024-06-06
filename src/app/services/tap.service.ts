import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createModifierTaps, createToolbarTaps } from '@taps';
import { ToolbarTaps, RecTapSignals, ModifierTaps } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  rec: RecTapSignals;
  toolbar: ToolbarTaps;
  modifiers: ModifierTaps;

  constructor(router: Router) {
    this.rec = this.createRec();
    this.modifiers = createModifierTaps({ rec: this.rec, router });
    this.toolbar = createToolbarTaps({ rec: this.rec, router });
  }

  private createRec(): RecTapSignals {
    return {
      page: signal(null),
      action: signal(null),
      toolbar: signal(null),
    };
  }
}
