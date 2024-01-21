import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FetchService } from './services/fetch.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public response: any = {
    data: 'Data',
    errorMessage: 'errorMessage',
  };
  constructor(private _fetchService: FetchService) {}

  public ngOnInit(): void {
    this._fetchService.get('https://localhost:7001/api/Users').subscribe(console.log)
  }

  // onClick() {
  //   console.log('onClick')
  // }
}
