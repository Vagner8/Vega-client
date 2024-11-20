import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { FormComponent } from '@components/atoms';
import { MatButtonModule, MatCardModule, MatListModule } from '@mat';
import { FractalService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, FormComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  sort = input<string[]>([]);
  rows = input<IFractal[]>([]);
  modifier = input<string>();
  formRecord = input<FormRecord>();

  constructor(public fs: FractalService) {}

  deleteRow(row: IFractal): void {
    this.fs.rows.delete(row);
  }
}
