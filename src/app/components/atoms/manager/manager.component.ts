import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { RouterService, StateService } from '@services';

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
    private rs: RouterService,
  ) {}

  onClick(): void {
    this.rs.navigate('Page');
  }

  onHoldClick(): void {
    this.rs.navigate('Setting');
  }

  onDblclick(): void {
    this.rs.navigate();
  }
}
