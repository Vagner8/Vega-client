import { Injectable, signal } from '@angular/core';
import { Fractal, FractalDto, State } from '@types';
import { FractalClass, StateClass } from '@utils';
import { DataService } from '@services';
import { Router } from '@angular/router';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  row = this.state();
  root = this.state();
  page = this.state();
  manager = this.state();
  modifier = this.state();
  sidenavTaps = this.state();

  isHoldAnimationStarted = signal(false);
  isHoldAnimationSucceed = signal(false);

  constructor(
    public ds: DataService,
    public router: Router
  ) {}

  toFractal(dto: FractalDto): Fractal {
    return this.create(dto, this.toFractals(dto.fractals));
  }

  update(): void {
    const row = this.row.$fractals()[0];
    const { dto, formGroup, isClone } = row;
    Object.entries(formGroup.value).forEach(([indicator, value]) => {
      dto.controls.forEach(control => {
        if (control.indicator === indicator) control.data = value || '';
      });
    });
    if (isClone) {
      this.page.fractal.fractals.push(row);
      this.ds.add(dto).subscribe(console.log);
    } else {
      this.ds.update(dto).subscribe(console.log);
    }
    this.page.set(this.page.fractal);
  }

  delete(): void {
    const rowsDtoToDelete = this.row.$fractals().map(({ dto }) => dto);
    this.ds.delete(rowsDtoToDelete).subscribe(console.log);
    this.page.fractal.fractals = this.page.fractal.fractals.filter(
      ({ dto }) => !rowsDtoToDelete.includes(dto)
    );
    this.page.set(this.page.fractal);
  }

  clone(): Fractal {
    const fractalId = v4();
    const { dto, sort } = this.page.fractal;
    const newFractal = new FractalClass(
      {
        id: fractalId,
        parentId: dto.id,
        controls: sort.map(indicator => ({
          id: v4(),
          parentId: fractalId,
          indicator,
          data: '',
        })),
        fractals: [],
      },
      []
    );
    newFractal.isClone = true;
    return newFractal;
  }

  private toFractals(fractals: FractalDto[]): Fractal[] {
    if (!fractals) return [];
    return fractals.map(dto => this.create(dto, this.toFractals(dto.fractals)));
  }

  private create(dto: FractalDto, fractals: Fractal[]): Fractal {
    return new FractalClass(dto, fractals);
  }

  private state(): State {
    return new StateClass(this);
  }
}
