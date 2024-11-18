import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputComponent, TableComponent } from '@components/atoms';
import { MatButtonModule, MatCardModule, MatListModule } from '@mat';
import { FractalService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [InputComponent, MatListModule, MatCardModule, TableComponent, MatButtonModule, NgClass],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifierComponent {
  @Input() sort: string[] = [];
  @Input() rows: IFractal[] = [];
  @Input() modifier!: string;

  constructor(public fs: FractalService) {}

  deleteRow(row: IFractal): void {
    this.fs.rows.delete(row);
  }
}
