import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { TapService, StateService } from '@services';
import { Tap, TapPlace } from '@types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  taps: Tap[] = [];

  constructor(private _state: StateService, private _tap: TapService) {}

  ngOnInit(): void {
    this.taps = this._tap.getTaps(TapPlace.Toolbar);
  }

  onClick(tap: Tap): void {
    tap.rec();
    if (tap.signal().icon === 'close') {
      this._resetIcons();
      this._state.drawerOpened.set(false);
      return;
    } else {
      this._resetIcons();
      tap.update({ icon: 'close' });
      this._state.drawerOpened.set(true);
    }
  }

  private _resetIcons(): void {
    this.taps.forEach((tap) => tap.restore('icon'));
  }
}
