import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIcon,
  MatInputModule,
} from '@mat';
import { InputComponent } from '../input/input.component';
import { Controls, InputType, LoginInput } from '@types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    InputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public inputs: LoginInput[] = [
    this._createInput(
      'Email',
      'email',
      new FormControl('', [Validators.required, Validators.email]),
    ),
    this._createInput(
      'Password',
      'password',
      new FormControl('', [Validators.required]),
    ),
  ];
  public loginFormGroup = new FormGroup(this._getControls());

  public onSubmit(): void {
    console.log('🚀 ~ formGroup:', this.loginFormGroup);
  }

  private _getControls(): Controls {
    return this.inputs.reduce((acc, input) => {
      acc[input.label] = input.formControl;
      return acc;
    }, {} as Controls);
  }

  private _createInput(
    label: string,
    type: InputType,
    formControl: FormControl,
  ): LoginInput {
    return {
      label,
      type,
      formControl,
    };
  }
}
