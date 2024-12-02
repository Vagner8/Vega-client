import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { TapDirective } from '@directives';
import { IFractal } from '@types';
import { FractalService } from '@services';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  @Input() tap!: IFractal;

  hold = output<IFractal>();
  touch = output<IFractal>();

  fs = inject(FractalService);
}
