import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';
import { InputType } from '@types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @ViewChild('inputElementRef')
  private _inputElementRef!: ElementRef<HTMLInputElement>;
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() clearButton = true;

  clearControl(): void {
    this.control.setValue('');
    this.control.markAsDirty();
  }

  toggleInputType(): void {
    const input = this._inputElementRef.nativeElement;
    input.type = input.type === InputType.Text ? InputType.Password : InputType.Text;
  }

  toggleVisibilityIcon(): string {
    return this._inputElementRef.nativeElement.type === 'password' ? 'visibility' : 'visibility_off';
  }

  get messages(): {
    valid: string;
    required: string;
  } {
    return {
      valid: `${$localize`Please enter a valid`}`,
      required: `${$localize`is required`}`,
    };
  }
}
