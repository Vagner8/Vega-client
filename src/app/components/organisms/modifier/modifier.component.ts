import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { FormComponent } from '@components/atoms';
import { MatButtonModule, MatCardModule, MatListModule } from '@mat';
import { FractalService } from '@services';
import { IFractal } from '@types';
import { CardHeaderComponent } from './card-header/card-header.component';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, FormComponent, CardHeaderComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  @Input() formRecord!: FormRecord;
  sort = input<string[]>([]);
  rows = input<IFractal[]>([]);

  constructor(public fs: FractalService) {}

  deleteRow(row: IFractal): void {
    this.fs.rows.delete(row);
  }

  onInputOut(row: IFractal): void {
    this.fs.formGroupChanges.set(row);
  }
}
