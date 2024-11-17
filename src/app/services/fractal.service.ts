import { Injectable, signal } from '@angular/core';
import {
  ControlsDto,
  FractalDto,
  FractalsDto,
  IFractal,
  IFractals,
  Indicators,
  Types,
} from '@types';
import { Fractal } from '@utils';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  pages: IFractal | null = null;
  manager: IFractal | null = null;
  modifiers: IFractal | null = null;

  root = signal<IFractal | null>(null);
  page = signal<IFractal | null>(null);
  taps = signal<IFractal | null>(null);
  modifier = signal<IFractal | null>(null);
  managerEvent = signal('');

  holding = {
    go: signal(false),
    end: signal(false),
    reset() {
      this.go.set(false);
      this.end.set(false);
    },
  };

  rows = {
    fractals: signal<IFractal[]>([]),
    set(fractal: IFractal) {
      const set = new Set(this.fractals());
      set[set.has(fractal) ? 'delete' : 'add'](fractal);
      this.fractals.set(Array.from(set));
    },
  };

  constructor(
    public ds: DataService,
    public router: Router
  ) {}

  cloneRow(parent: IFractal | null): void {
    if (!parent) return;
    const cloneId = v4();
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
    const cursor = parent.list().length.toString();
    row.cursor = parent.fractals ? cursor : '0';
    row.isClone = true;
    if (parent.fractals) {
      parent.fractals[cursor] = row;
    } else {
      parent.fractals = { 0: row };
    }
    this.rows.fractals.set([row]);
  }

  update(): void {
    const toUpdate = this.rows.fractals()[0];
    const { dto, formGroup } = toUpdate;
    Object.entries(formGroup.data.getRawValue()).forEach(([indicator, data]) => {
      dto.controls[indicator].data = data as string;
    });
    if (toUpdate.isClone) {
      this.ds.add(dto).subscribe(data => console.log('🚀 ~ add:', data));
    } else {
      this.ds.update(dto).subscribe(data => console.log('🚀 ~ update:', data));
    }
    this.afterRequest();
  }

  delete(): void {
    const toDelete: FractalDto[] = [];
    const fractals = this.page()?.fractals;
    if (!fractals) return;
    for (const row of this.rows.fractals()) {
      toDelete.push(row.dto);
      delete fractals[row.cursor];
    }
    this.ds.delete(toDelete).subscribe(data => console.log('🚀 ~ delete:', data));
    this.afterRequest();
  }

  toFractal(dto: FractalDto) {
    return new Fractal(dto, this.toFractals(dto.fractals));
  }

  private afterRequest(): void {
    this.rows.fractals.set([]);
    this.modifier.set(null);
    this.router.navigate([this.page()?.cursor], {
      queryParams: { [Types.Manager]: this.managerEvent() },
    });
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
