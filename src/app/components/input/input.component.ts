import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIcon,
  MatInputModule,
} from '@mat';

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
})
export class InputComponent {
  @ViewChild('inputElementRef')
  private _inputElementRef!: ElementRef<HTMLInputElement>;
  @Input() inputFormControl!: FormControl;
  @Input() type: string = 'text';
  @Input() clearButton = true;
  @Input() placeholder = '';
  @Input() label = '';

  public togglePasswordVisibility(): void {
    const input = this._inputElementRef.nativeElement;
    input.type = input.type === 'text' ? 'password' : 'text';
  }

  public togglePasswordVisibilityIcon(): string {
    return this._inputElementRef.nativeElement.type === 'password' ? 'visibility' : 'visibility_off';
  }
}
