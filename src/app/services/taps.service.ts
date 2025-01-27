import { inject, Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';
import { FractalEntities } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class TapsService {
  bs = inject(BaseService);
  $taps = signal<IFractal | null>(null);

  init({ Taps, modifiers, collections }: { Taps: string; modifiers: IFractal; collections: IFractal }): void {
    this.$taps.set(Taps === FractalEntities.Collections ? collections : modifiers);
  }

  async set(taps: IFractal): Promise<void> {
    this.$taps.set(taps);
    await this.bs.navigate({ [FractalEntities.Taps]: taps.cursor });
  }
}
