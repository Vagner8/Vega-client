import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputComponent, TableComponent } from '@components/atoms';
import { MatCardModule, MatListModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [InputComponent, MatListModule, MatCardModule, TableComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  @Input() sort: string[] = [];
  @Input() rows: IFractal[] = [];
  @Input() modifier!: string;
}
