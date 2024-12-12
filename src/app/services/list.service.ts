import { inject, Injectable, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IFractal, Modifiers, Types } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  rows = signal<IFractal[]>([]);
  form = new FormArray<FormGroup>([]);
  router = inject(Router);

  async add(row: IFractal): Promise<void> {
    this.rows.update(prev => {
      if (prev.includes(row)) {
        return this.removeHelper(prev, row);
      } else {
        this.form.push(row.formGroup);
        return [...prev, row];
      }
    });
    await this.navigate();
  }

  init({ rowsIds, modifier, list }: { rowsIds: string; modifier: string; list: IFractal }): void {
    this.rows.set(
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

  clear(): void {
    this.rows.set([]);
    this.form = new FormArray<FormGroup>([]);
    this.navigate();
  }

  hold(table: IFractal | null): void {
    this.rows.update(prev => (prev.length === 0 && table ? table.list() : []));
    this.navigate();
  }

  remove(row: IFractal): void {
    this.rows.update(prev => this.removeHelper(prev, row));
    this.navigate();
  }

  private removeHelper(rows: IFractal[], removedRow: IFractal): IFractal[] {
    this.form.removeAt(rows.indexOf(removedRow));
    return rows.filter(row => row !== removedRow);
  }

  private async navigate(): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        [Types.Rows]: this.rows()
          .map(row => row.dto.id)
          .join(':'),
      },
      queryParamsHandling: 'merge',
    });
  }
}
