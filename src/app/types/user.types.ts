import { FormControl } from '@angular/forms';
import { FormGroupMap } from './common.types';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
}

export type UserCreationForm = FormGroupMap<Omit<User, 'id'>> & {
  password: FormControl;
};
