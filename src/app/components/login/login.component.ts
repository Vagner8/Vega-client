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
import { ApiUrl, Controls, InputType, LoginInput, User } from '@types';
import { CommonStateService, FetchService } from '@services';

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
      InputType.Email,
      new FormControl('', [Validators.required, Validators.email])
    ),
    this._createInput(
      'Password',
      InputType.Password,
      new FormControl('', [Validators.required])
    )
  ];
  public loginFormGroup = new FormGroup(this._getControls());

  constructor(
    private _fetchService: FetchService,
    private _commonStateService: CommonStateService
  ) {}

  public onLogin(): void {
    this._fetchService
      .post<User>(ApiUrl.login, {
        userName: this.loginFormGroup.value['Email'],
        password: this.loginFormGroup.value['Password'],
      })
      .subscribe((user) => {
        console.log('🚀 ~ result:', user);
      });
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
    formControl: FormControl
  ): LoginInput {
    return {
      label,
      type,
      formControl,
    };
  }
}
