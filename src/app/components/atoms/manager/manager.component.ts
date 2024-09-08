import { Component } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { ControlsPipe, FractalPipe } from '@pipes';
import { FractalService, ManagerService, StateService } from '@services';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    MatIcon,
    FractalPipe,
    ControlsPipe,
    ClickDirective,
    MatButtonModule,
    MatProgressSpinner,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  constructor(
    public ss: StateService,
    public fs: FractalService,
    private ms: ManagerService
  ) {}

  onClick(): void {
    this.ms.clickType.set('one');
  }

  onHoldClick(): void {
    this.ms.clickType.set('hold');
  }
}
