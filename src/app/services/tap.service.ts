import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { drawerTaps, toolbarTaps } from '@taps';
import {
  RecTap,
  PathTap,
  DrawerTaps,
  ToolbarTaps,
  TapServiceProps,
} from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  rec: RecTap;
  path: PathTap;
  drawer: DrawerTaps;
  toolbar: ToolbarTaps;

  constructor(private router: Router) {
    this.rec = this.setRec();
    this.path = this.setPath();
    const sp = this.serviceProps();
    this.drawer = drawerTaps(sp);
    this.toolbar = toolbarTaps(sp);
  }

  private setRec(): RecTap {
    return {
      pages: signal(null),
      toolbar: signal(null),
      actions: signal(null),
      settings: signal(null),
    };
  }

  private setPath(): PathTap {
    return {
      page: computed(() => this.rec.pages()),
      action: computed(() => {
        let result = null;
        result = this.rec.actions();
        result = this.rec.settings();
        return result;
      }),
    };
  }

  private serviceProps(): TapServiceProps {
    return {
      rec: this.rec,
      path: this.path,
      router: this.router,
    };
  }
}
