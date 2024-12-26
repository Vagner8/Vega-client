import { NgClass } from '@angular/common';
import { Component, inject, Input, output, signal } from '@angular/core';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, MatTableModule } from '@mat';
import { AppModifierService, ModifiersService, RowsService } from '@services';
import { Collections, IFractal } from '@types';
import { CollectionComponent } from '@components/atoms';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    CollectionComponent,
    NgClass,
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent {
  rs = inject(RowsService);
  ms = inject(ModifiersService);
  ams = inject(AppModifierService);
  @Input() fractal!: IFractal;
  closed = output<IFractal>();

  get isCollection(): boolean {
    return this.fractal.is(Collections);
  }

  afterExpand(fractal: IFractal): void {
    const level = this.ams.getLevel(fractal);
    if (this.ams.$levels[level]) this.ams.$levels[level].set(fractal);
    else this.ams.$levels[level] = signal(fractal);
    this.ams.$current.set(fractal);
    this.ms.currentTouched$.next(null);
  }
}
