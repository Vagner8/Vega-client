import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { IFractal, Modifiers, Pages } from '@types';
import { FractalService } from '@services';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  tap = input<IFractal>();

  onHold = output<IFractal>();
  onClick = output<IFractal>();
  onHoldStart = output<IFractal>();

  disabled = computed<boolean>(() =>
    this.tap()?.is('New') || this.tap()?.is(Pages) ? false : this.fs.rows.signal().length === 0
  );

  constructor(public fs: FractalService) {}

  activateOnHold(tap: IFractal): boolean {
    return [Modifiers.Save, Modifiers.Delete].some(cursor => tap.is(cursor));
  }
}
