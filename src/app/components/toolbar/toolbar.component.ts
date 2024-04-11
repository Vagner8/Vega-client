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

  constructor(private state: StateService, private tap: TapService) {}

  ngOnInit() {
    this.taps = this.tap.getTaps(TapPlace.Toolbar);
  }

  onClick(tap: Tap) {
    tap.rec();
    if (tap.signal().icon === 'close') {
      this.resetIcons();
      this.state.drawerOpened.set(false);
      return;
    } else {
      this.resetIcons();
      tap.update({ icon: 'close' });
      this.state.drawerOpened.set(true);
    }
  }

  private resetIcons() {
    this.taps.forEach((tap) => tap.restore('icon'));
  }
}
