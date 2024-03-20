import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DrawerComponent,
  HeaderComponent,
  ToolbarComponent,
} from '@components';
import { StateService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent, HeaderComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private _state: StateService) {}

  get error() {
    return this._state.error;
  }
}
