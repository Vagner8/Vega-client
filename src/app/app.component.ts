import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DrawerComponent,
  HeaderComponent,
  ToolbarComponent,
} from '@components';
import { CommonActsService } from '@services';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent, HeaderComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private _commonActsService: CommonActsService,
    // private _router: Router
  ) {}

  // ngOnInit(): void {
  //   this._router.events.subscribe((data) => {
  //     console.log('🚀 ~ data:', data);
  //   });
  // }

  get error() {
    return this._commonActsService.error;
  }
}
