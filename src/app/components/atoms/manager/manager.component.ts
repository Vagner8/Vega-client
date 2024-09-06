import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { ManagerService, StateService } from '@services';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatProgressSpinner, ClickDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  constructor(
    public ss: StateService,
    private ms: ManagerService,
  ) {}

  onClick(): void {
    this.ms.clickType.set('one');
  }

  onHoldClick(): void {
    this.ms.clickType.set('hold');
  }
}
