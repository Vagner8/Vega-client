import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CollectionsService, ModifiersService } from '@services';
import { Modifiers } from '@types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cs = inject(CollectionsService);
  ms = inject(ModifiersService);

  title = computed<string>(() => {
    const modifier = this.ms.$fractal();
    const modifierTitle = modifier?.is(Modifiers.New) ? Modifiers.Edit : modifier?.cursor;
    return `${this.cs.$fractal()?.cursor} ${modifierTitle || ''}`;
  });
}
