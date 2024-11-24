import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective, TapsActivationDirective } from '@directives';
import { IFractal, Modifiers } from '@types';
import { FractalService } from '@services';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective, TapsActivationDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  tap = input<IFractal>();
  disabled = input<IFractal>();

  onHold = output<IFractal>();
  onClick = output<IFractal>();
  onHoldStart = output<IFractal>();

  constructor(public fs: FractalService) {}

  activateOnHold(tap: IFractal): boolean {
    return [Modifiers.Save, Modifiers.Delete].some(cursor => tap.is(cursor));
  }
}
