import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, output } from '@angular/core';
import { MatButtonModule, MatCardModule, MatListModule } from '@mat';
import { FractalService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, NgClass],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() row!: IFractal;
  clickOut = output<IFractal>();
  toggledClass: 'Untouched' | 'Touched' = 'Untouched';

  toggleClass = computed<string>(() => {
    if (this.fs.formGroupChanges() === this.row) {
      this.toggledClass = 'Touched';
    }
    return this.toggledClass;
  });

  constructor(public fs: FractalService) {}
}
