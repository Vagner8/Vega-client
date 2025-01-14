import { Injectable, signal } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RowsService extends BaseService {
  $fractals = signal<IFractal[]>([]);

  init({ Rows, collection }: { collection: IFractal; Rows: string }): void {
    this.$fractals.set(
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
      this.$fractals.set([]);
    } else {
      this.$fractals.update(prev => {
        if (prev.includes(rowToSet)) {
          return prev.filter(row => row !== rowToSet);
        } else {
          return [...prev, rowToSet];
        }
      });
    }
    await this.navigateToRows();
  }

  async hold(collection: IFractal | null): Promise<void> {
    this.$fractals.update(prev => (prev.length === 0 && collection ? collection.fractalsArray : []));
    this.navigateToRows();
  }

  delete(rowToDelete: IFractal): void {
    this.$fractals.update(prev => prev.filter(row => row !== rowToDelete));
    this.navigateToRows();
  }

  private async navigateToRows(): Promise<void> {
    await this.navigate({
      [FractalsParams.Rows]: this.$fractals()
        .map(row => row.dto.id)
        .join(':'),
    });
  }
}
