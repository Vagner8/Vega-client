import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MatTableModule } from '@mat';
import { CommonModule } from '@angular/common';
import { ApiUrl, User } from '@types';
import { FetchService } from '@services';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  public users: WritableSignal<User[]> = signal<User[]>([]);
  public matColumnDefs: string[] = ['position', 'name', 'email', 'id', 'updated', 'created'];

  constructor(private _fetchService: FetchService) {}

  public ngOnInit(): void {
    this._fetchService
      .get<User[]>(ApiUrl.Users)
      .subscribe(users => this.users.set(users.result));
  }
}
