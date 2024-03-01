import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUrl } from '@types';
import { FormComponent } from '../../form/form.component';
import { FetchService } from '@services';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  userRegisterFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _fetchService: FetchService) {}

  onCreate(): void {
    this._fetchService.post(ApiUrl.UserRegister, this.userRegisterFormGroup.value).subscribe((user) => {
      console.log('🚀 ~ user:', user);
    });
  }
}
