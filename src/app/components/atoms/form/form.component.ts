import { Component, Input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';
import { ControlInputs, Fractal, Indicators } from '@types';
import { SelectComponent } from '../select/select.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    SelectComponent,
    InputComponent,
  ],
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
