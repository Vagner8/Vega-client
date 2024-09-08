import { Component, Input } from '@angular/core';
import { FractalNames, RenderTypes } from '@types';
import { ArrayPipe, FractalPipe, ControlsPipe } from '@pipes';
import { TableComponent, TapComponent } from '@components/atoms';
import { FractalService, RouterService } from '@services';
import { isPagesNames } from '@utils';

@Component({
  selector: 'app-render',
  standalone: true,
  imports: [TapComponent, TableComponent, ArrayPipe, FractalPipe, ControlsPipe],
  templateUrl: './render.component.html',
  styleUrl: './render.component.css',
})
export class RenderComponent {
  @Input({ required: true }) type!: RenderTypes;
  @Input({ required: true }) name!: FractalNames;

  constructor(
    public rs: RouterService,
    public fs: FractalService
  ) {}

  onClick(name: string) {
    this.rs.navigate(isPagesNames(name) ? name : null);
  }
}
