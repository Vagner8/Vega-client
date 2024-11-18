import { Injectable, signal } from '@angular/core';
import { ControlsDto, FractalDto, FractalsDto, IFractal, IFractals, Indicators } from '@types';
import { Fractal, PageState, ModifierState, TapsState, ManagerState, FractalsState } from '@utils';
import { DataService } from './data.service';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  pages: IFractal | null = null;
  manager: IFractal | null = null;
  modifiers: IFractal | null = null;

  root = signal<IFractal | null>(null);
  page = new PageState();
  taps = new TapsState();
  rows = new FractalsState();
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
    const rowsToAdd: FractalDto[] = [];
    if (!parent) return;
    rows.forEach(row => {
      if (parent.fractals) parent.fractals[row.cursor] = row;
      else parent.fractals = { [row.cursor]: row };
      rowsToAdd.push(row.update());
    });
    if (rows[0].isClone) {
      this.ds.add(rowsToAdd).subscribe(data => console.log('🚀 ~ add:', data));
    } else {
      this.ds.edit(rowsToAdd).subscribe(data => console.log('🚀 ~ add:', data));
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

  private reset(): void {
    this.rows.signal.set([]);
    this.modifier.set(null);
    this.page.set(this.page.signal());
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
