import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputComponent, TableComponent } from '@components/atoms';
import { MatCardModule, MatListModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [InputComponent, MatListModule, MatCardModule, TableComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  @Input() sort: string[] = [];
  @Input() rows: Fractal[] = [];
  @Input() shape: Fractal | null = null;
  @Input() modifier!: string;

  get firstRow(): Fractal {
    return this.rows[0];
  }
}
