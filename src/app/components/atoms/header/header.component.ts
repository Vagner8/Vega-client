import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListService, ModifiersService } from '@services';
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
  ls = inject(ListService);
  ms = inject(ModifiersService);

  get modifier(): string | undefined {
    const modifier = this.ms.$modifier();
    return modifier?.is(Modifiers.New) ? Modifiers.Edit : modifier?.cursor;
  }
}
