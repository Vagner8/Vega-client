import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent, ToolbarComponent } from '@components';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  error: WritableSignal<string | null>;

  constructor(private _globalStateService: GlobalStateService) {
    this.error = this._globalStateService.error
  }
}
