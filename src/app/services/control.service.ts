import { Injectable } from '@angular/core';
import { Control, ControlDto, ControlName } from '@types';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  findDto(name: ControlName, controls: ControlDto[]) {
    return controls.find((c) => c.name === name);
  }

  find(name: ControlName, controls: Control[]) {
    return controls.find((c) => c.name.value === name);
  }
}
