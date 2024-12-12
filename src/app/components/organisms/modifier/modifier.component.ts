import { ChangeDetectionStrategy, Component, computed, Input, output } from '@angular/core';
import { FormComponent } from '@components/atoms';
import { MatButtonModule, MatCardModule, MatListModule } from '@mat';
import { IFractal, Modifiers } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, FormComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent extends SuperComponent {
  @Input() rows: IFractal[] = [];
  @Input() modify: 'rows' | 'columns' = 'rows';

  deleteRow = output<IFractal>();
  subtitle = computed(() => {
    const cursor = this.ms.$modifier()?.cursor;
    return cursor === Modifiers.New ? Modifiers.Edit : cursor;
  });
}
