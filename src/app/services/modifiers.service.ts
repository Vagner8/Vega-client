import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService {
  modifiers!: IFractal;
  $modifier = signal<IFractal | null>(null);

  init({ Modifier }: { Modifier: string }): void {
    this.$modifier.set(Modifier ? this.modifiers.find(Modifier) : null);
  }

  get modifier(): IFractal {
    const modifier = this.$modifier();
    if (!modifier) throw new Error(`Modifier is ${modifier}`);
    return modifier;
  }
}
