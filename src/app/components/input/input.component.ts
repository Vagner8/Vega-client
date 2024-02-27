import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIcon,
  MatInputModule,
} from '@mat';
import { IconName, InputType } from '@types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @ViewChild('inputElementRef')
  private _inputElementRef!: ElementRef<HTMLInputElement>;
  @Input() inputFormControl!: FormControl;
  @Input() inputType = InputType.Text;
  @Input() clearButton = true;
  @Input() placeholder = '';
  @Input() label = '';

  public toggleInputType(): void {
    const input = this._inputElementRef.nativeElement;
    input.type =
      input.type === InputType.Text ? InputType.Password : InputType.Text;
  }

  public toggleVisibilityIcon(): string {
    return this._inputElementRef.nativeElement.type === InputType.Password
      ? IconName.Visibility
      : IconName.Visibility_off;
  }

  public get messages() {
    return {
      valid: `${$localize`Please enter a valid`}`,
      required: `${$localize`is required`}`,
    };
  }
}
