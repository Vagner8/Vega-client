import { IFractal, Types } from '@types';
import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormRecord } from '@angular/forms';

export class RowsState {
  signal = signal<IFractal[]>([]);
  formRecord = signal<FormRecord<FormGroup> | null>(null);
  private router = inject(Router);

  async set(row: IFractal): Promise<void> {
    if (row.isClone && this.signal().some(row => !row.isClone)) this.unload();
    const set = new Set(this.signal());
    set[set.has(row) ? 'delete' : 'add'](row);
    this.signal.set(Array.from(set));
    this.formRecord.set(this.createFormRecord());
    this.navigate();
  }

  load(rows: IFractal[] = []): void {
    this.signal.set(rows);
    this.formRecord.set(this.createFormRecord());
    this.navigate();
  }

  unload(): void {
    this.signal.set([]);
    this.formRecord.set(null);
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

  public createFormRecord(): FormRecord<FormGroup> {
    return new FormRecord(
      this.signal().reduce((acc: Record<string, FormGroup>, row, index) => {
        acc[index] = row.formGroup;
        return acc;
      }, {})
    );
  }
}
