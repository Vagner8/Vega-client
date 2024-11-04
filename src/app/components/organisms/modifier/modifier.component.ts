import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputComponent } from '@components/atoms';
import { MatCardModule, MatListModule } from '@mat';
import { FractalNull } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [InputComponent, MatListModule, MatCardModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  @Input() sort: string[] = [];
  @Input() fractals: FractalNull[] = [];
  @Input() modifier!: string;
}
