import { IFractal, Types } from '@types';
import { State } from './state.utils';
import { signal } from '@angular/core';

export class FractalsState extends State<IFractal[], IFractal> {
  override signal = signal<IFractal[]>([]);

  async set(fractal: IFractal | null): Promise<void> {
    if (!fractal) return;
    if (fractal.isClone && !this.signal().every(row => row.isClone)) this.signal.set([]);
    const set = new Set(this.signal());
    set[set.has(fractal) ? 'delete' : 'add'](fractal);
    this.signal.set(Array.from(set));
    this.navigate();
  }

  delete(rowToDelete: IFractal) {
    this.signal.update(prev => (prev ? prev.filter(row => row !== rowToDelete) : []));
    this.navigate();
  }

  override async navigate(): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        [Types.Rows]: this.signal()
          .map(({ dto }) => dto.id)
          .join(':'),
      },
      queryParamsHandling: 'merge',
    });
  }
}
