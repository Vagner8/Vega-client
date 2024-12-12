import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
  rows = input<IFractal[]>([]);
  deleteRow = output<IFractal>();
  subtitle = computed(() => {
    const cursor = this.fs.modifier()?.cursor;
    return cursor === Modifiers.New ? Modifiers.Edit : cursor;
  });
}
