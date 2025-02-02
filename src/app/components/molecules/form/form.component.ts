import { Component, Input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent, SelectComponent } from '@components/atoms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@mat';
import { ControlInputs, Fractal, Indicators } from '@types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, SelectComponent, InputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() fractal!: Fractal;
  change = output<Fractal>();

  indicators = Indicators;
  controlInputs = ControlInputs;
  controlInputsArray = Object.values(ControlInputs);
}
