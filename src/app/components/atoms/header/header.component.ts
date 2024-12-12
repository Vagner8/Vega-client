import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Modifiers } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends SuperComponent {
  get modifier(): string | undefined {
    const modifier = this.fs.modifier();
    return modifier?.is(Modifiers.New) ? Modifiers.Edit : modifier?.cursor;
  }
}
