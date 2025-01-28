import { inject, Injectable, signal } from '@angular/core';
import { Fractal, FractalEntities } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TapsService {
  bs = inject(BaseService);
  $taps = signal<Fractal | null>(null);

  init({ Taps, modifiers, collections }: { Taps: string; modifiers: Fractal; collections: Fractal }): void {
    this.$taps.set(Taps === FractalEntities.Collections ? collections : modifiers);
  }

  async set(taps: Fractal): Promise<void> {
    this.$taps.set(taps);
    await this.bs.navigate({ [FractalEntities.Taps]: taps.cursor });
  }
}
