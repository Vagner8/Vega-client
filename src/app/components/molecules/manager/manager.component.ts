import { Component } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { FractalService } from '@services';
import { Events, Types } from '@types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [ClickDirective, MatButtonModule, SpinnerComponent, MatIcon],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  constructor(
    public fs: FractalService,
    private router: Router
  ) {}

  async onClick(): Promise<void> {
    const taps = this.fs[this.fs.taps.is(Types.Pages) ? 'modifiers' : 'pages'];
    this.fs.managerEvent.signal() === Events.Click && (await this.fs.taps.set(taps));
    this.set(Events.Click);
  }

  onHold(): void {
    this.set(Events.Hold);
  }

  private set(event: Events) {
    this.fs.managerEvent.set(event);
  }
}
