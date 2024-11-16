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
  imports: [MatIcon, ClickDirective, MatButtonModule, SpinnerComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  constructor(
    public fs: FractalService,
    private router: Router
  ) {}

  onClick(): void {
    const taps = this.fs[this.fs.taps()?.isCursor(Types.Pages) ? 'modifiers' : 'pages'];
    this.fs.managerEvent() === Events.Click && this.fs.taps.set(taps);
    this.set(Events.Click);
  }

  onHold(): void {
    this.set(Events.Hold);
  }

  private set(event: Events) {
    this.fs.managerEvent.set(event);
    this.router.navigate([], {
      queryParams: { [Types.Manager]: event },
      queryParamsHandling: 'merge',
    });
  }
}
