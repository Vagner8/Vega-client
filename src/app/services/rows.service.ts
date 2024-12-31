import { Injectable, signal } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RowsService extends BaseService {
  $currents = signal<IFractal[]>([]);

  init({ Rows, collection }: { collection: IFractal; Rows: string }): void {
    this.$currents.set(
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
      this.$currents.set([]);
    } else {
      this.$currents.update(prev => {
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
    this.$currents.update(prev => (prev.length === 0 && collection ? collection.fractalsList : []));
    this.navigateToRows();
  }

  delete(rowToDelete: IFractal): void {
    this.$currents.update(prev => prev.filter(row => row !== rowToDelete));
    this.navigateToRows();
  }

  private async navigateToRows(): Promise<void> {
    await this.navigate({
      [FractalsParams.Rows]: this.$currents()
        .map(row => row.dto.id)
        .join(':'),
    });
  }
}
