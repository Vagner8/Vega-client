import { Component, Input } from '@angular/core';
import { FractalNames } from '@types';
import { ArrayPipe, FractalPipe, ControlsPipe } from '@pipes';
import { TapComponent } from '@components/atoms';
import { FractalService } from '@services';
import { MatTableModule } from '@mat';

@Component({
  selector: 'app-render',
  standalone: true,
  imports: [MatTableModule, TapComponent, ArrayPipe, FractalPipe, ControlsPipe],
  templateUrl: './render.component.html',
  styleUrl: './render.component.css',
})
export class RenderComponent {
  @Input() name!: FractalNames;
  @Input() type!: 'Taps' | 'Rows';

  constructor(public fs: FractalService) {}
}
