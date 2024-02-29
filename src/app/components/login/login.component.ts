import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUrl, User } from '@types';
import { FetchService } from '@services';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _fetchService: FetchService) {}

  onLogin(): void {
    this._fetchService
      .post<User>(ApiUrl.login, this.loginFormGroup.value)
      .subscribe((user) => {
        console.log('🚀 ~ result:', user);
      });
  }
}
