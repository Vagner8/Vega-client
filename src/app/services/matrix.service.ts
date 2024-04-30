import { Injectable } from '@angular/core';
import { ControlName, Matrix, MatrixDto } from '@types';
import { TapService } from './tap.service';
import { MapService } from './map.service';
import { ControlService } from './control.service';

@Injectable({
  providedIn: 'root',
})
export class MatrixService {
  data = new Map<string, Matrix>();
  dataDto = new Map<string, MatrixDto>();

  constructor(
    private map: MapService,
    private control: ControlService
  ) {}

  onInit(matrices: MatrixDto[]) {
    matrices.forEach((m) => {
      const control = this.control.findDto("Name", m.controls);
      if (control) this.data.set(control.data, this.map.toMatrix(m));
    });
  }
}
