import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { ControlService, RouterService } from '@services';
import { ControlsData } from '@types';
import { isPagesNames } from '@utils';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  @Input() data!: ControlsData;

  constructor(
    public cs: ControlService,
    private rs: RouterService,
  ) {}

  onClick() {
    const page = this.data.Fractal;
    this.rs.navigate(isPagesNames(page) ? page : null);
  }
}
