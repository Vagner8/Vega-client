import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { IFractal, Modifiers } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapComponent {
  @Input() tip = '';
  @Input() tap!: IFractal;
  @Input() disabled = false;
  onClick = output<IFractal>();
  onHold = output<IFractal>();

  activateOnHold(tap: IFractal): boolean {
    return [Modifiers.Save, Modifiers.Delete].some(cursor => tap.is(cursor));
  }
}
