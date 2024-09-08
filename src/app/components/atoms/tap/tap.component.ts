import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { ControlsPipe } from '@pipes';
import { ControlService, RouterService } from '@services';
import { FractalDto } from '@types';
import { isPagesNames } from '@utils';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective, ControlsPipe],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  @Input() fractal!: FractalDto;

  constructor(
    public cs: ControlService,
    private rs: RouterService
  ) {}

  onClick(name: string) {
    this.rs.navigate(isPagesNames(name) ? name : null);
  }
}
