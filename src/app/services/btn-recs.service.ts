import { Injectable, signal } from '@angular/core';
import {
  BtnAct,
  BtnRec,
  BtnRecGroup,
  BtnActType,
} from '@types';

@Injectable({
  providedIn: 'root',
})
export class BtnRecsService {
  readonly recs: BtnRecGroup = {
    [BtnActType.Active]: signal(null),
    [BtnActType.Navigation]: signal(null),
    [BtnActType.Toolbar]: signal(null),
    [BtnActType.Settings]: signal(null),
  };

  activityRec(): BtnRec {
    return this.recs[BtnActType.Active];
  }

  navigationRec(): BtnRec {
    return this.recs[BtnActType.Navigation];
  }

  toolbarRec(): BtnRec {
    return this.recs[BtnActType.Toolbar];
  }

  settingsRec(): BtnRec {
    return this.recs[BtnActType.Settings];
  }

  rec({ name, type }: BtnAct): void {
    this.recs[type].set({ name, type });
  }

  reset(): void {
    Object.values(this.recs).forEach((action) => action.set(null));
  }
}
