import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { FractalService } from '@services';
import { Events, Types } from '@types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [ClickDirective, MatButtonModule, SpinnerComponent, MatIcon, NgClass],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent {
  constructor(public fs: FractalService) {}

  async onClick(): Promise<void> {
    if (this.fs.modifier.signal()) {
      await this.fs.page.set(this.fs.page.signal());
      this.fs.reset();
      return;
    }
    const taps = this.fs[this.fs.taps.is(Types.Pages) ? 'modifiers' : 'pages'];
    this.fs.managerEvent.signal() === Events.Click && (await this.fs.taps.set(taps));
    this.fs.managerEvent.set(Events.Click);
  }

  onHold(): void {
    this.fs.managerEvent.set(Events.Hold);
  }
}
