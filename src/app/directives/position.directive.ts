import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { IFractal, Indicators } from '@types';

@Directive({
  selector: '[appPosition]',
  standalone: true,
})
export class PositionDirective implements OnInit {
  @Input() fractal!: IFractal;
  el = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit(): void {
    // const el = this.el.nativeElement;
    // el.style.position = 'fixed';
    // el.style.top = Number(this.fractal.data(Indicators.Y)) + 'px';
    // el.style.left = Number(this.fractal.data(Indicators.X)) + 'px';
  }
}
