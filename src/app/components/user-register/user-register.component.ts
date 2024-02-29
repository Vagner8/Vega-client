import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUrl } from '@types';
import { FormComponent } from '../form/form.component';
import { FetchService } from '@services';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  public userRegisterFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _fetchService: FetchService) {}

  public onCreate(): void {
    this._fetchService.post(ApiUrl.UserRegister, this.userRegisterFormGroup.value).subscribe((user) => {
      console.log('🚀 ~ user:', user);
    });
  }
}
