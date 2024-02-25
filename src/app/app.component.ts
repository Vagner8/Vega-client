import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent, LoginComponent, ToolbarComponent } from '@components';
import { CommonStateService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent, LoginComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public error: WritableSignal<string | null>;

  constructor(private _commonStateService: CommonStateService) {
    this.error = this._commonStateService.error;
  }
}
