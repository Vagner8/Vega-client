import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IFractal, Modifiers, Types } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  $list = signal<IFractal | null>(null);
  $rows = signal<IFractal[]>([]);
  $columns: Record<string, WritableSignal<string[]>> = {};
  form = new FormArray<FormGroup>([]);
  router = inject(Router);

  set(list: IFractal): void {
    this.form = new FormArray<FormGroup>([]);
    this.$rows.set([]);
    this.$list.set(list);
    if (!this.$columns[list.cursor]) {
      this.$columns[list.cursor] = signal(list.sort());
    }
    this.router.navigate([list.cursor], {
      queryParams: { [Types.Rows]: null, [Types.Modifier]: null },
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
        this.form.push(row.formGroup);
        return [...prev, row];
      }
    });
    await this.navigateToRows();
  }

  init({ rowsIds, modifier, list }: { rowsIds: string; modifier: string; list: IFractal }): void {
    this.$columns[list.cursor] = signal(list.sort());
    this.$rows.set(
      rowsIds
        ? rowsIds.split(':').map(rowId => {
            try {
              const row = list.find(rowId);
              this.form.push(row.formGroup);
              return list.find(rowId);
            } catch {
              const clone = list.clone();
              this.form.push(clone.formGroup);
              return clone;
            }
          })
        : []
    );
    if (Modifiers.Delete === modifier) {
      this.form.disable();
    }
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
    this.form.removeAt(rows.indexOf(removedRow));
    return rows.filter(row => row !== removedRow);
  }

  private async navigateToRows(): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        [Types.Rows]: this.$rows()
          .map(row => row.dto.id)
          .join(':'),
      },
      queryParamsHandling: 'merge',
    });
  }
}
