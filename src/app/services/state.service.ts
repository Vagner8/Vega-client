import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '@types';
import { StateClass } from '@utils';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  row = this.create();
  root = this.create();
  page = this.create();
  manager = this.create();
  modifier = this.create();
  sidenavTaps = this.create();

  isHoldAnimationStarted = signal(false);
  isHoldAnimationSucceed = signal(false);

  constructor(
    public ds: DataService,
    public router: Router
  ) {}

  private create(): State {
    return new StateClass(this);
  }

  async update(): Promise<void> {
    const { dto, formGroup, isClone } = this.row.$fractals()[0];
    Object.entries(formGroup.value).forEach(([indicator, value]) => {
      dto.controls.forEach(control => {
        if (control.indicator === indicator) control.data = value || '';
      });
    });
    if (isClone) {
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
}
