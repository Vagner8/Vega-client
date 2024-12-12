import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FractalsParams, IFractal } from '@types';

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

  router = inject(Router);

  set(list: IFractal): void {
    this.rowsForm = new FormArray<FormGroup>([]);
    this.$rows.set([]);
    this.$list.set(list);
    if (!this.$columns[list.cursor]) {
      this.$columns[list.cursor] = signal(list.sort());
    }
    this.router.navigate([list.cursor], {
      queryParams: { [FractalsParams.Rows]: null, [FractalsParams.Modifier]: null },
      queryParamsHandling: 'merge',
    });
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

  addColumn(): void {
    this.list.sort().forEach(item => {
      this.columnsForm.push(new FormGroup({ column: new FormControl(item) }));
    });
  }

  init({ Rows, Lists }: { Rows: string; Lists: string }): void {
    this.$list.set(this.lists.find(Lists));
    this.$columns[this.list.cursor] = signal(this.list.sort());
    this.$rows.set(
      Rows
        ? Rows.split(':').map(rowId => {
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
    await this.router.navigate([], {
      queryParams: {
        [FractalsParams.Rows]: this.$rows()
          .map(row => row.dto.id)
          .join(':'),
      },
      queryParamsHandling: 'merge',
    });
  }
}
