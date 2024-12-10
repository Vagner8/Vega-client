import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { TapDirective } from '@directives';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, TapDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent extends SuperComponent {
  @Input() tap!: IFractal;
  @Input() disabled = false;

  hold = output<IFractal>();
  touch = output<IFractal>();
}
