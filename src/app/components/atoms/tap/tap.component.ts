import { ChangeDetectionStrategy, Component, computed, Input, output } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { IFractal, Modifiers } from '@types';
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
  @Input() tap!: IFractal;
  onClick = output<IFractal>();
  onHold = output<IFractal>();

  constructor(public fs: FractalService) {}

  disabled = computed<boolean>(() => {
    const rows = this.fs.rows.signal();
    const isNew = this.fs.modifier.is(Modifiers.New);
    const hasRows = rows.length > 0;

    switch (this.tap.cursor) {
      case Modifiers.Edit:
        return isNew || !hasRows;
      case Modifiers.Save:
        return rows.length ? !rows.some(({ formGroup }) => formGroup.data.dirty) : true;
      case Modifiers.Delete:
        return isNew || !hasRows;
      default:
        return false;
    }
  });

  activateOnHold(tap: IFractal): boolean {
    return [Modifiers.Save, Modifiers.Delete].some(cursor => tap.is(cursor));
  }
}
