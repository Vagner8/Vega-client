import { Injectable, signal } from '@angular/core';
import { ControlsDto, FractalDto, FractalsDto, IFractal, IFractals, Indicators } from '@types';
import { Fractal, PageState, ModifierState, TapsState, ManagerState, RowsState } from '@utils';
import { DataService } from './data.service';
import { v4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  pages: IFractal | null = null;
  modifiers: IFractal | null = null;

  root = signal<IFractal | null>(null);
  manager = signal<IFractal | null>(null);
  formGroupChanges = signal<IFractal | null>(null);
  disableFormGroups = new BehaviorSubject(false);

  page = new PageState();
  taps = new TapsState();
  rows = new RowsState();
  modifier = new ModifierState();
  managerEvent = new ManagerState();

  holding = {
    go: signal(false),
    end: signal(false),
    reset() {
      this.go.set(false);
      this.end.set(false);
    },
  };

  rowsLength: number | null = null;

  constructor(public ds: DataService) {}

  clone(): Fractal {
    const parent = this.page.signal()!;
    if (!this.rowsLength) this.rowsLength = parent.list().length;
    const cloneId = v4();
    this.rowsLength++;
    const row = new Fractal(
      {
        id: cloneId,
        parentId: parent.dto.id,
        controls: parent.split(Indicators.Sort).reduce((acc, indicator) => {
          acc[indicator] = {
            id: v4(),
            parentId: cloneId,
            indicator,
            data: '',
          };
          return acc;
        }, {} as ControlsDto),
        fractals: null,
      },
      null
    );
    row.cursor = parent.fractals ? this.rowsLength.toString() : '0';
    row.isClone = true;
    return row;
  }

  update(): void {
    const rows = this.rows.signal();
    const parent = this.page.signal();
    if (!parent || rows.length == 0) return;
    const rowsToAdd: FractalDto[] = [];
    const rowsToUpdate: FractalDto[] = [];
    rows.forEach(row => {
      if (row.isClone) {
        if (parent.fractals) parent.fractals[row.cursor] = row;
        else parent.fractals = { [row.cursor]: row };
        rowsToAdd.push(row.update());
      } else {
        rowsToUpdate.push(row.update());
      }
    });
    if (rowsToAdd.length > 0) {
      this.ds.add(rowsToAdd).subscribe(data => console.log('🚀 ~ add:', data));
    }
    if (rowsToUpdate.length > 0) {
      this.ds.edit(rowsToUpdate).subscribe(data => console.log('🚀 ~ add:', data));
    }
    this.reset();
  }

  delete(): void {
    const toDelete: FractalDto[] = [];
    const fractals = this.page.signal()?.fractals;
    if (!fractals) return;
    for (const row of this.rows.signal()) {
      toDelete.push(row.dto);
      delete fractals[row.cursor];
    }
    this.ds.delete(toDelete).subscribe(data => console.log('🚀 ~ delete:', data));
    this.reset();
  }

  toFractal(dto: FractalDto) {
    return new Fractal(dto, this.toFractals(dto.fractals));
  }

  async reset(page?: IFractal | null): Promise<void> {
    await this.page.set(page || this.page.signal());
    await this.modifier.set(null);
    this.rows.signal.set([]);
    this.formGroupChanges.set(null);
  }

  private toFractals(fractals: FractalsDto | null) {
    if (!fractals) return null;
    const result: IFractals = {};
    for (const indicator in fractals) {
      const fractal = new Fractal(
        fractals[indicator],
        this.toFractals(fractals[indicator].fractals)
      );
      fractal.cursor = indicator;
      result[indicator] = fractal;
    }
    return result;
  }
}
