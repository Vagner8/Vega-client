import { Component, WritableSignal, signal } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { User } from '../../types/user';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  public users: WritableSignal<User[]> = signal<User[]>([]);
  public displayedColumns: string[] = ['position', 'name', 'email', 'id', 'updated'];

  constructor(private _fetchService: FetchService) {}

  public ngOnInit(): void {
    this._fetchService
      .get<User[]>('https://localhost:7001/api/Users')
      .subscribe(users => this.users.set(users));
  }
}
