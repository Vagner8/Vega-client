import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { Fractal } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  @Input() isSet = false;
  @Input() fractal!: Fractal;
  @Input() disabled = false;
  onClick = output<Fractal>();
  onHoldClick = output<Fractal>();
}
