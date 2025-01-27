import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';
import { FractalEntities } from '@constants';

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
    await this.navigate({ [FractalEntities.Modifiers]: modifier ? modifier.cursor : null });
  }

  init({ root, Modifiers }: { root: IFractal; Modifiers: string }): void {
    this.$modifier.set(Modifiers ? root.retrieve(Modifiers) : null);
  }
}
