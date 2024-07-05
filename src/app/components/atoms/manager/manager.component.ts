import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatButtonModule, MatIcon, MatProgressSpinner } from '@mat';
import { StateService, TapService } from '@services';
import { TapManager } from '@types';
import { ClickDirective } from '@directives';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [CommonModule, MatIcon, MatProgressSpinner, MatButtonModule, ClickDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent implements OnInit {
  tap!: TapManager;

  constructor(
    private ts: TapService,
    private ss: StateService,
  ) {}

  ngOnInit(): void {
    this.tap = this.ts.manager;
  }

  get isFetching(): WritableSignal<boolean> {
    return this.ss.isFetching;
  }
}
