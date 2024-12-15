import { inject, Injectable, signal } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  modifiers!: IFractal;
  $modifier = signal<IFractal | null>(null);

  bs = inject(BaseService);

  async set(modifier: IFractal | null): Promise<void> {
    this.$modifier.set(modifier);
    await this.bs.navigate({ [FractalsParams.Modifier]: modifier ? modifier.cursor : null });
  }

  init({ Modifier }: { Modifier: string }): void {
    this.$modifier.set(Modifier ? this.modifiers.find(Modifier) : null);
  }

  get modifier(): IFractal {
    const modifier = this.$modifier();
    if (!modifier) throw new Error(`Modifier is ${modifier}`);
    return modifier;
  }
}
