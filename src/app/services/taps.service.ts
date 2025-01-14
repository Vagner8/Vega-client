import { inject, Injectable, signal } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TapsService {
  bs = inject(BaseService);
  $fractal = signal<IFractal | null>(null);

  init({ Taps, modifiers, collections }: { Taps: string; modifiers: IFractal; collections: IFractal }): void {
    this.$fractal.set(Taps === FractalsParams.Collections ? collections : modifiers);
  }

  async set(taps: IFractal): Promise<void> {
    this.$fractal.set(taps);
    await this.bs.navigate({ [FractalsParams.Taps]: taps.cursor });
  }
}
