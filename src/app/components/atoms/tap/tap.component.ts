import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PAGES } from '@constants';
import { ClickDirective } from '@directives';
import { FractalService, RouterService } from '@services';
import { TapConfigUnion, TapModifiersNames, TapPagesNames } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  @Input() config!: TapConfigUnion;

  constructor(
    private rs: RouterService,
    private fls: FractalService,
  ) {}

  onClick() {
    const { name, type } = this.config;
    const { page } = this.rs.segments();
    switch (type) {
      case 'pages':
        this.rs.navigate(name as TapPagesNames);
        break;
      case 'modifiers':
        this.rs.navigate(page, name as TapModifiersNames);
        break;
    }
  }

  ids(): string {
    return this.fls
      .selected()
      .map(({ id }) => id)
      .join(':');
  }
}
