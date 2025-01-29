import { Component, Input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule, MatSelectModule } from '@mat';
import { ControlInputs, Fractal, Indicators } from '@types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() fractal!: Fractal;
  change = output<Fractal>();

  indicators = Indicators;
  controlInputs = ControlInputs;
}
