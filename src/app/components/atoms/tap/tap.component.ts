import { Component, Input } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { ClickDirective } from '@directives';
import { ControlsPipe } from '@pipes';
import { ControlService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [MatIcon, MatButtonModule, ClickDirective, ControlsPipe],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  @Input() fractal!: FractalDto;

  constructor(public cs: ControlService) {}
}
