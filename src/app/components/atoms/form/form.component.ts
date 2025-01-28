import { Component, Input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() fractal!: Fractal;
  change = output<Fractal>();
  prevRawValue!: Record<string, string>;
}
