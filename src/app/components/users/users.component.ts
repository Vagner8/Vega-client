import { Component, WritableSignal, signal } from '@angular/core';
import { MatTableModule } from '@mat';
import { CommonModule } from '@angular/common';
import { UsersTypes } from '@types';
import { FetchService, API } from '@services';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  public users: WritableSignal<UsersTypes.User[]> = signal<UsersTypes.User[]>([]);
  public matColumnDefs: string[] = ['position', 'name', 'email', 'id', 'updated', 'created'];

  constructor(private _fetchService: FetchService) {}

  public ngOnInit(): void {
    this._fetchService
      .get<UsersTypes.User[]>(API.Users)
      .subscribe(users => this.users.set(users.result));
  }

  public onAddUser() {
    this._fetchService.post<UsersTypes.User>(API.Users, {
      data: {
        userId: 'index',
        login: `login`,
        firstName: `new`,
        lastName: `new`,
        email: 'new@gmail.com',
        phone: '+420776544634',
        updated: '',
        created: '',
        password: ''
      },
      accessToken: 'accessToken'
    }).subscribe(data => {
      console.log("🚀 ~ onAddUser:", data)
    })
  }

  public onDeleteUser() {
    this._fetchService.delete(API.Users, { userId: 'f7de89ab-f65b-465b-aee8-58730763b97e' }).subscribe(data => {
      console.log("🚀 ~ onDeleteUser:", data)
    });
  }

  public onGetUser() {
    this._fetchService
      .get<UsersTypes.User[]>(API.Users, { userId: 'f7de89ab-f65b-465b-aee8-58730763b97e' })
      .subscribe(user => console.log("🚀 ~ onGetUser:", user));
  }
}
