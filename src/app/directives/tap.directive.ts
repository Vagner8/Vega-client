import { Directive } from '@angular/core';

@Directive({
  selector: '[appModifiers]',
  standalone: true,
})
export class TapDirective {
  // @Input() set clickType(type: ClickType) {
  //   this.setTaps(type);
  // }
  // constructor(
  //   private fs: FractalService,
  //   private cs: ControlService,
  //   private view: ViewContainerRef,
  // ) {}
  // private setTaps(type: ClickType): void {
  //   const taps = this.currentTaps(type);
  //   if (!taps) return;
  //   this.addTaps(taps);
  // }
  // private currentTaps(type: ClickType): FractalDto | null {
  //   return this.fs.data[Object.values(FRACTALS)[type]]();
  // }
  // private addTaps({ fractals, controls }: FractalDto): void {
  //   this.cs
  //     .parse(controls)
  //     .Sort.split(':')
  //     .forEach((name) => {
  //       const { instance } = this.view.createComponent(TapComponent);
  //       const { Icon, Fractal } = this.cs.parse(fractals[name].controls);
  //       instance.icon = Icon;
  //       instance.name = Fractal;
  //     });
  // }
}
