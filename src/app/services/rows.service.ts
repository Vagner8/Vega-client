import { inject, Injectable, signal } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RowsService {
  bs = inject(BaseService);
  $rows = signal<IFractal[]>([]);

  get rows(): IFractal[] {
    return this.$rows();
  }

  init({ Rows, collection }: { collection: IFractal; Rows: string }): void {
    this.$rows.set(
      Rows
        ? Rows.split(':').map(row => {
            try {
              return collection.find(row);
            } catch {
              return collection.cloneChild();
            }
          })
        : []
    );
  }

  async set(rowToSet: IFractal | null): Promise<void> {
    if (!rowToSet) {
      this.$rows.set([]);
    } else {
      this.$rows.update(prev => {
        if (prev.includes(rowToSet)) {
          return prev.filter(row => row !== rowToSet);
        } else {
          return [...prev, rowToSet];
        }
      });
    }
    await this.navigate();
  }

  async hold(collection: IFractal | null): Promise<void> {
    this.$rows.update(prev => (prev.length === 0 && collection ? collection.list : []));
    this.navigate();
  }

  delete(rowToDelete: IFractal): void {
    this.$rows.update(prev => prev.filter(row => row !== rowToDelete));
    this.navigate();
  }

  private async navigate(): Promise<void> {
    await this.bs.navigate({
      [FractalsParams.Rows]: this.$rows()
        .map(row => row.dto.id)
        .join(':'),
    });
  }
}
