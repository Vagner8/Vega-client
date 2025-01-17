import { Injectable, signal } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService extends BaseService {
  hold$ = new Subject<IFractal | null>();
  touch$ = new Subject<IFractal | null>();
  $modifier = signal<IFractal | null>(null);
  modifiers!: IFractal;

  hold(modifier: IFractal | null): void {
    this.hold$.next(modifier);
  }

  async touch(modifier: IFractal | null): Promise<void> {
    this.touch$.next(modifier);
    this.$modifier.set(modifier);
    await this.navigate({ [FractalsParams.Modifier]: modifier ? modifier.cursor : null });
  }

  init({ root, Modifier }: { root: IFractal; Modifier: string }): void {
    this.$modifier.set(Modifier ? root.find(Modifier) : null);
  }
}
