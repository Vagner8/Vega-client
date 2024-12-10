import { inject, Injectable, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IFractal, Types } from '@types';

@Injectable({
  providedIn: 'root',
})
export class RowsService {
  list = signal<IFractal[]>([]);
  form = new FormArray<FormGroup>([]);
  router = inject(Router);

  async add(row: IFractal): Promise<void> {
    this.list.update(prev => {
      if (prev.includes(row)) {
        return this.removeHelper(prev, row);
      } else {
        this.form.push(row.formGroup);
        return [...prev, row];
      }
    });
    await this.navigate();
  }

  init(ids: string, table: IFractal): void {
    this.list.set(
      ids
        ? ids.split(':').map(rowId => {
            try {
              const row = table.find(rowId);
              this.form.push(row.formGroup);
              return table.find(rowId);
            } catch {
              const clone = table.clone();
              this.form.push(clone.formGroup);
              return table.clone();
            }
          })
        : []
    );
  }

  clear(): void {
    this.list.set([]);
    this.form = new FormArray<FormGroup>([]);
    this.navigate();
  }

  hold(table: IFractal | null): void {
    this.list.update(prev => (prev.length === 0 && table ? table.list() : []));
    this.navigate();
  }

  remove(row: IFractal): void {
    this.list.update(prev => this.removeHelper(prev, row));
    this.navigate();
  }

  private removeHelper(rows: IFractal[], removedRow: IFractal): IFractal[] {
    this.form.removeAt(rows.indexOf(removedRow));
    return rows.filter(row => row !== removedRow);
  }

  private async navigate(): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        [Types.Rows]: this.list()
          .map(row => row.dto.id)
          .join(':'),
      },
      queryParamsHandling: 'merge',
    });
  }
}
