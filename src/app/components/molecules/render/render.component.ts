import { Component, Input, output } from '@angular/core';
import { FractalDto, FractalNames, RenderTypes } from '@types';
import { ArrayPipe, FractalPipe, ControlsPipe } from '@pipes';
import { TableComponent, TapComponent } from '@components/atoms';
import { FractalService, RouterService } from '@services';

@Component({
  selector: 'app-render',
  standalone: true,
  imports: [TapComponent, TableComponent, ArrayPipe, FractalPipe, ControlsPipe],
  templateUrl: './render.component.html',
  styleUrl: './render.component.css',
})
export class RenderComponent {
  onClick = output<FractalDto>();
  @Input({ required: true }) type!: RenderTypes;
  @Input({ required: true }) name!: FractalNames;

  constructor(
    public rs: RouterService,
    public fs: FractalService
  ) {}
}
