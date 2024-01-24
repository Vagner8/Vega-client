import { Component, WritableSignal, signal } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { User } from '../../types/user';
import { MatTableModule } from '@angular/material/table';
import { UsersMock } from '../../mocks/users-mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  public users: WritableSignal<User[]> = signal<User[]>([]);
  public matColumnDefs: string[] = ['position', 'name', 'email', 'id', 'updated', 'created'];

  constructor(private _fetchService: FetchService) {}

  public ngOnInit(): void {
    this.users.set(UsersMock);
    // this._fetchService
    //   .get<User[]>('https://localhost:7001/api/Users')
    //   .subscribe(users => this.users.set(users));
  }
}
