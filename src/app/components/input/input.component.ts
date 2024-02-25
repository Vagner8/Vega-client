import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIcon,
  MatInputModule,
} from '@mat';
import { CapitalizeFirstLetterPipe } from '@pipes';
import { InputType } from '@types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CapitalizeFirstLetterPipe,
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
  @Input() type: InputType.Type = 'text';
  @Input() clearButton: boolean = true;
  @Input() placeholder: string = '';
  @Input() label: string = '';

  public togglePasswordVisibility(): void {
    const input = this._inputElementRef.nativeElement;
    input.type = input.type === 'text' ? 'password' : 'text';
  }

  public togglePasswordVisibilityIcon(): string {
    return this._inputElementRef.nativeElement.type === 'password' ? 'visibility' : 'visibility_off'
  }
}