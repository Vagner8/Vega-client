import { Component, inject, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { SelectService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-fractals-table',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './fractals-table.component.html',
  styleUrl: './fractals-table.component.scss',
})
export class FractalsTableComponent {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
}
