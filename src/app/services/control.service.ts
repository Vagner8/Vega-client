import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlItem, ControlNames, ControlOptions, ControlFieldType } from '@types';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  readonly controls: ControlItem[][] = [];
  private selectOptions = [ControlFieldType.Number, ControlFieldType.Select, ControlFieldType.Text];

  add(): void {
    this.controls.push([
      this.create('name'),
      this.create('value'),
      this.create('type', ControlFieldType.Select, { selectOptions: this.selectOptions }),
      this.create('operation')
    ]);
  }

  toDto() {
    
  }

  private create(name: ControlNames, valueType = ControlFieldType.Text, options?: ControlOptions): ControlItem {
    return {
      name,
      valueType,
      formControl: new FormControl(''),
      options
    };
  }
}
