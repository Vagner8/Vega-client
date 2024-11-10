import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Data, State } from '@types';
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

  update(): void {
    const toUpdate = this.row.$fractals()[0];
    const { dto, formGroup } = toUpdate;
    if (toUpdate.checkName(Data.Shape)) {
      this.ds.add(dto).subscribe(console.log);
    } else {
      Object.entries(formGroup.value).forEach(([indicator, value]) => {
        dto.controls.forEach(control => {
          if (control.indicator === indicator) control.data = value || '';
        });
      });
      this.ds.update(dto).subscribe(console.log);
    }
    this.page.set(this.page.fractal);
  }

  delete(): void {
    this.ds.delete(this.row.$fractals().map(({ dto }) => dto)).subscribe(() => this.row.set(null));
    this.page.set(this.page.fractal);
  }
}
