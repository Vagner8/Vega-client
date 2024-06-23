import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { TapService, StateService } from '@services';
import { TapToolbar } from '@types';
import { InfoComponent } from '../info/info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatToolbar,
    MatButtonModule,
    InfoComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  taps: TapToolbar[] = [];

  constructor(
    private ts: TapService,
    private ss: StateService,
  ) {}

  ngOnInit() {
    this.taps = this.ts.toolbars;
  }

  onClick(tap: TapToolbar) {
    tap.onClick();
    if (tap.state.icon() === 'close') {
      this.resetIcons();
      this.ss.drawerOpened.set(false);
      return;
    } else {
      this.resetIcons();
      tap.state.icon.set('close');
      this.ss.drawerOpened.set(true);
    }
  }

  private resetIcons() {
    this.taps.forEach((tap) => tap.resetOne('icon'));
  }
}
