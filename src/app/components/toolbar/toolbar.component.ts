import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatToolbar } from '@mat';
import { TapService, StateService } from '@services';
import { TapToolbar } from '@types';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbar, ToolbarButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  taps: TapToolbar[] = [];

  constructor(
    private ts: TapService,
    private ss: StateService,
  ) {}

  ngOnInit(): void {
    this.taps = this.ts.toolbars;
  }

  get isFetching(): WritableSignal<boolean> {
    return this.ss.isFetching;
  }

  onClick(tap: TapToolbar): void {
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

  private resetIcons(): void {
    this.taps.forEach((tap) => tap.resetOne('icon'));
  }
}
