import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon, MatToolbar, MatButtonModule } from '@mat';
import { TapService, StateService } from '@services';
import { ToolbarTap } from '@taps';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatIcon, MatToolbar, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  taps: ToolbarTap[] = [];

  constructor(private tap: TapService, private state: StateService) {}

  ngOnInit() {
    this.taps = this.tap.toolbar.arr;
  }

  onClick(tap: ToolbarTap) {
    this.tap.rec.toolbar.set(tap.name);
    if (tap.state.icon() === 'close') {
      this.resetIcons();
      this.state.drawerOpened.set(false);
      return;
    } else {
      this.resetIcons();
      tap.setState({ icon: 'close' });
      this.state.drawerOpened.set(true);
    }
  }

  private resetIcons() {
    this.taps.forEach((tap) => tap.restore('icon'));
  }
}
