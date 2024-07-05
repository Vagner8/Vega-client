import { Component, Input } from '@angular/core';
import { InputComponent, SelectComponent } from '@components/atoms';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [InputComponent, SelectComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent {
  @Input() control!: object;

  get controls() {
    return this.control;
  }
}
