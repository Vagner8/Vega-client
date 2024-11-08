import { Injectable } from '@angular/core';
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

  constructor(
    public ds: DataService,
    public router: Router
  ) {}

  private create(): State {
    return new StateClass(this);
  }

  update(): void {
    const { dto, name, formGroup } = this.row.$fractals()[0];
    Object.entries(formGroup.value).forEach(([indicator, value]) => {
      dto.controls.forEach(control => {
        if (control.indicator === indicator) control.data = value || '';
      });
    });
    if (name === Data.Shape) {
      this.ds.add(dto).subscribe(console.log);
    } else {
      this.ds.update(dto).subscribe(console.log);
    }
  }

  delete(): void {}
}
