import { Injectable } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService extends BaseService {
  modifiers!: IFractal;

  async set(modifier: IFractal | null): Promise<void> {
    this.$current.set(modifier);
    await this.navigate({ [FractalsParams.Modifier]: modifier ? modifier.cursor : null });
  }

  init({ root, Modifier }: { root: IFractal; Modifier: string }): void {
    this.$current.set(Modifier ? root.find(Modifier) : null);
  }
}
