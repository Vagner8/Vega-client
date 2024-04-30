import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { TapService, StateService, NavService } from '@services';
import { Tap } from '@types';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  taps: Tap[] = [];

  constructor(
    private tap: TapService,
    private state: StateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taps = this.tap.data.Toolbar;
  }

  onClick(tap: Tap) {
    if (tap.signal().icon === 'close') {
      this.resetIcons();
      this.state.drawerOpened.set(false);
      return;
    } else {
      this.resetIcons();
      tap.update({ icon: 'close' });
      this.state.drawerOpened.set(true);
    }
    tap.navigate();
  }

  private resetIcons() {
    this.taps.forEach((tap) => tap.restore('icon'));
  }
}
