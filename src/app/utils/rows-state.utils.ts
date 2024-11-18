import { IFractal, Types } from '@types';
import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export class RowsState {
  protected router = inject(Router);
  signal = signal<IFractal[]>([]);

  async set(row: IFractal): Promise<void> {
    if (row.isClone && this.signal().some(row => !row.isClone)) this.signal.set([]);
    const set = new Set(this.signal());
    set[set.has(row) ? 'delete' : 'add'](row);
    this.signal.set(Array.from(set));
    this.navigate();
  }

  delete(rowToDelete: IFractal) {
    this.signal.update(prev => prev.filter(row => row !== rowToDelete));
    this.navigate();
  }

  async navigate(): Promise<void> {
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
