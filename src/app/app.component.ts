import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent, ToolbarComponent } from '@components';
import { CommonStateService, UserStateService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private _commonStateService: CommonStateService,
    private _userStateService: UserStateService
  ) {}

  public get error(): WritableSignal<string | null> {
    return this._commonStateService.error;
  }

  public get login(): WritableSignal<boolean> {
    return this._userStateService.login;
  }
}
