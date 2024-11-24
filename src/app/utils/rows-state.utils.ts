import { IFractal, Types } from '@types';
import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormRecord } from '@angular/forms';

export class RowsState {
  signal = signal<IFractal[]>([]);
  private router = inject(Router);

  async set(row: IFractal): Promise<void> {
    const set = new Set(this.signal());
    set[set.has(row) ? 'delete' : 'add'](row);
    this.signal.set(Array.from(set));
    this.navigate();
  }

  setRows(row: IFractal[]): void {
    this.signal.set(Array.from(row));
  }

  async load(rows: IFractal[] = []): Promise<void> {
    this.signal.set(rows);
    this.navigate();
  }

  unload(): void {
    this.signal.set([]);
    this.navigate();
  }

  delete(rowToDelete: IFractal): void {
    this.signal.update(prev => prev.filter(row => row !== rowToDelete));
    this.navigate();
  }

  filter(callback: (row: IFractal) => boolean): void {
    this.signal.update(rows => rows.filter(callback));
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

  public createFormRecord(): FormRecord<FormGroup> {
    return new FormRecord(
      this.signal().reduce((acc: Record<string, FormGroup>, row, index) => {
        acc[index] = row.formGroup;
        return acc;
      }, {})
    );
  }
}
