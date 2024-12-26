import { Component, computed, inject, Input } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { MatButtonModule, MatCardModule } from '@mat';
import { ModifiersService, RowsService } from '@services';
import { IFractal, Modifiers } from '@types';

@Component({
  selector: 'app-rows-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormCardComponent],
  templateUrl: './rows-modifier.component.html',
  styleUrl: './rows-modifier.component.scss',
})
export class RowsModifierComponent {
  rs = inject(RowsService);
  ms = inject(ModifiersService);
  @Input() rows: IFractal[] = [];
  subtitle = computed(() => {
    const cursor = this.ms.$current()?.cursor;
    return cursor === Modifiers.New ? Modifiers.Edit : cursor;
  });
}
