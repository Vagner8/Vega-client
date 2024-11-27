import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { EventDirective, TapsActivationDirective } from '@directives';
import { IFractal } from '@types';
import { FractalService } from '@services';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, EventDirective, TapsActivationDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  tap = input<IFractal>();
  disabled = input<IFractal>();

  hold = output<IFractal>();
  touch = output<IFractal>();

  constructor(public fs: FractalService) {}
}
