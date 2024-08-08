import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
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
    const { type: typePath, page } = this.rs.params();
    switch (type) {
      case 'Page':
        if (name === 'Home') this.rs.navigate('Page');
        else this.rs.navigate(typePath, name as TapPagesNames);
        break;
      case 'Modifier':
        this.rs.navigate(typePath, page, name as TapModifiersNames, this.ids());
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
