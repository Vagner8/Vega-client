import { Injectable } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TapsService extends BaseService {
  init({ Taps, lists, modifiers }: { Taps: string; lists: IFractal; modifiers: IFractal }): void {
    this.$current.set(Taps === FractalsParams.Collections ? lists : modifiers);
  }

  async set(taps: IFractal): Promise<void> {
    this.$current.set(taps);
    await this.navigate({ [FractalsParams.Taps]: taps.cursor });
  }
}
