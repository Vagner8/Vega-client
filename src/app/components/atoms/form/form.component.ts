import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  sort = input<string[]>([]);
  formGroup = input<FormGroup | null>(null);

  inputOut = output<FormGroup>();

  onClick(input: HTMLInputElement): void {
    input.value = '';
    this.formGroup()?.markAsDirty();
  }
}
