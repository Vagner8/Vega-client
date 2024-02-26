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
import { LoginType, CommonType, InputType } from '@types';

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
  public inputs: LoginType.Input[] = [
    new Input(
      'Email',
      'email',
      new FormControl('', [Validators.required, Validators.email])
    ),
    new Input(
      'Password',
      'password',
      new FormControl('', [Validators.required])
    ),
  ];
  public loginFormGroup = new FormGroup(this._getControls());

  public onSubmit(): void {
    console.log('🚀 ~ formGroup:', this.loginFormGroup);
  }

  private _getControls(): CommonType.Controls {
    return this.inputs.reduce((acc, input) => {
      acc[input.label] = input.formControl;
      return acc;
    }, {} as CommonType.Controls);
  }
}

export class Input implements LoginType.Input {
  constructor(
    public label: string,
    public type: InputType.Type,
    public formControl: FormControl
  ) {}
}
