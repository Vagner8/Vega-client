import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { FractalService, StateService, TapService } from '@services';
import { Fractal } from '@types';

@Directive({
  selector: '[appFractal]',
  standalone: true,
})
export class FractalDirective {
  @Input({ required: true }) fractal!: Fractal;
  @Input({ required: true }) set selected(fractals: Fractal[]) {
    this.isSelected = fractals.includes(this.fractal);
  }
  @HostBinding('class.is-selected') isSelected = false;

  constructor(
    private ts: TapService,
    private ss: StateService,
    private fls: FractalService,
  ) {}

  @HostListener('onClick')
  onClick = () => {
    this.fls.selected.update((state) =>
      state.includes(this.fractal)
        ? state.filter((f) => f !== this.fractal)
        : [...state, this.fractal],
    );
    this.ts.executors$.next(this.ts.actions);
    this.ss.sidenav.set('open');
  };
}
