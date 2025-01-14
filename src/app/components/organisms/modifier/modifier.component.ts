import { Component, Input } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { MatButtonModule, MatCardModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormCardComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent {
  @Input() fractal: IFractal | null = null;
  @Input() fractals: IFractal[] = [];
}
