import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@mat';
import { CommonModule } from '@angular/common';
import { ApiUrl, UserState } from '@types';
import { FetchService } from '@services';
import { EntityService } from 'app/services/entity.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  matColumnDefs: (keyof UserState)[] = ['id', 'name', 'email', 'phone'];

  constructor(
    private _fetchService: FetchService,
    private _entity: EntityService
  ) {}

  get users() {
    return this._entity.entities.users;
  }

  ngOnInit() {
    this._fetchService
      .get<UserState[]>(ApiUrl.Users)
      .subscribe(({ data }) => {
        this._entity.set(data);
      });
  }
}
