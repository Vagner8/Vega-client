import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FractalService } from '@services';
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
  modifier = computed<string | undefined>(() => {
    const modifier = this.fs.modifier.signal();
    return modifier?.is(Modifiers.New) ? Modifiers.Edit : modifier?.cursor;
  });

  constructor(public fs: FractalService) {}
}
