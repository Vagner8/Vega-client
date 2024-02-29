import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@mat';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [InputComponent, MatButtonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() formGroup!: FormGroup;
  @Output() submitEvent = new EventEmitter();

  onSubmitEvent(): void {
    this.submitEvent.emit();
  }

  get controlInputs(): [string, FormControl][] {
    return Object.entries(this.formGroup.controls) as [string, FormControl][];
  }
}
