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

  clone(parent: IFractal | null): void {
    if (!parent || !parent.fractals) return;
    const cloneId = v4();
    const clone = new Fractal(
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
    clone.isClone = true;
    parent.fractals[parent.list().length + 1] = clone;
    this.rows.fractals.set([clone]);
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
    this.rows.fractals.set([]);
    this.modifier.set(null);
    this.router.navigate([this.page()?.data(Indicators.Cursor)], {
      queryParams: { [Types.Manager]: this.managerEvent() },
    });
  }

  toFractal(dto: FractalDto) {
    return new Fractal(dto, this.toFractals(dto.fractals));
  }

  private toFractals(fractals: FractalsDto | null) {
    if (!fractals) return null;
    const result: IFractals = {};
    for (const indicator in fractals) {
      result[indicator] = new Fractal(
        fractals[indicator],
        this.toFractals(fractals[indicator].fractals)
      );
    }
    return result;
  }
}
