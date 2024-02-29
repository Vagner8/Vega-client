import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DrawerComponent,
  HeaderComponent,
  ToolbarComponent,
} from '@components';
import { CommonStateService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent, HeaderComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private _commonStateService: CommonStateService) {}

  public get error(): WritableSignal<string | null> {
    return this._commonStateService.error;
  }
}
