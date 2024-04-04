import { Injectable, signal } from '@angular/core';
import { Control, ControlDto, ControlType, Operation } from 'app/types/control.type';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private readonly _controls: Control[] = [];

  constructor() {
    this.add('Name');
  }

  toControl({ id, type, name, value, operation }: ControlDto): Control {
    return {
      id,
      signal: signal({ type, name, value, operation })
    };
  }

  add(
    name: string = '',
    value: string = '',
    type: ControlType = ControlType.Text,
    operation: Operation = Operation.Create
  ): void {
    this._controls.push({ signal: signal({ type, name, value, operation }) });
  }
}
