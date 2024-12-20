import { Component, Input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input({ required: true }) fractal!: IFractal;
  change = output<IFractal>();
  prevRawValue!: Record<string, string>;

  get names(): string[] {
    return Object.keys(this.fractal.formRecord.controls);
  }
}
