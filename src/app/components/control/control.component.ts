import { Component, Input, input } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { Control } from '@types';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [InputComponent, SelectComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent {
  @Input() control!: Control;

  get controls() {
    return this.control;
  }
}
