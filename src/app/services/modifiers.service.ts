import { Injectable, signal } from '@angular/core';
import { Fractal, FractalEntities } from '@types';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModifiersService extends BaseService {
  hold$ = new Subject<Fractal | null>();
  touch$ = new Subject<Fractal | null>();
  $modifier = signal<Fractal | null>(null);
  modifiers!: Fractal;

  hold(modifier: Fractal | null): void {
    this.hold$.next(modifier);
  }

  async touch(modifier: Fractal | null): Promise<void> {
    this.touch$.next(modifier);
    this.$modifier.set(modifier);
    await this.navigate({ [FractalEntities.Modifiers]: modifier ? modifier.cursor : null });
  }

  init({ root, Modifiers }: { root: Fractal; Modifiers: string }): void {
    this.$modifier.set(Modifiers ? root.getFractal(Modifiers) : null);
  }
}
