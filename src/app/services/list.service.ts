import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FractalsParams, IFractal, Lists, Modifiers } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  $list = signal<IFractal | null>(null);
  $rows = signal<IFractal[]>([]);
  $columns: Record<string, WritableSignal<string[]>> = {};

  lists!: IFractal;
  rowsForm = new FormArray<FormGroup>([]);
  columnsForm = new FormArray<FormGroup>([]);

  bs = inject(BaseService);

  async set(list: IFractal): Promise<void> {
    this.rowsForm = new FormArray<FormGroup>([]);
    this.$rows.set([]);
    this.$list.set(list);
    if (!this.$columns[list.cursor] && !list.is(Lists.Home)) {
      this.$columns[list.cursor] = signal(list.columns());
    }
    await this.bs.navigate({ [FractalsParams.Rows]: null }, [list.cursor]);
  }

  get list(): IFractal {
    const fractal = this.$list();
    if (!fractal) throw new Error(`List is ${fractal}`);
    return fractal;
  }

  async addRow(row: IFractal): Promise<void> {
    this.$rows.update(prev => {
      if (prev.includes(row)) {
        return this.removeHelper(prev, row);
      } else {
        this.rowsForm.push(row.formGroup);
        return [...prev, row];
      }
    });
    await this.navigateToRows();
  }

  editColumn(): void {
    this.list.columns().forEach(item => {
      this.columnsForm.push(new FormGroup({ Column: new FormControl(item) }));
    });
    this.bs.navigate({ [FractalsParams.Modifier]: Modifiers.Columns });
  }

  init(params: { Rows: string; Lists: string }): void {
    this.$list.set(this.lists.find(params.Lists));
    if (params.Lists !== Lists.Home) {
      this.$columns[this.list.cursor] = signal(this.list.columns());
    }
    this.$rows.set(
      params.Rows
        ? params.Rows.split(':').map(rowId => {
            try {
              const row = this.list.find(rowId);
              this.rowsForm.push(row.formGroup);
              return this.list.find(rowId);
            } catch {
              const clone = this.list.clone();
              this.rowsForm.push(clone.formGroup);
              return clone;
            }
          })
        : []
    );
  }

  holdRow(list: IFractal | null): void {
    this.$rows.update(prev => (prev.length === 0 && list ? list.list() : []));
    this.navigateToRows();
  }

  removeRow(row: IFractal): void {
    this.$rows.update(prev => this.removeHelper(prev, row));
    this.navigateToRows();
  }

  private removeHelper(rows: IFractal[], removedRow: IFractal): IFractal[] {
    this.rowsForm.removeAt(rows.indexOf(removedRow));
    return rows.filter(row => row !== removedRow);
  }

  private async navigateToRows(): Promise<void> {
    await this.bs.navigate({
      [FractalsParams.Rows]: this.$rows()
        .map(row => row.dto.id)
        .join(':'),
    });
  }
}
