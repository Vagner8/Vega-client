import { Directive, HostListener, Input, output } from '@angular/core';
import { FractalService } from '@services';
import { Timeout } from '@types';

@Directive({
  selector: '[appClick]',
  standalone: true,
})
export class ClickDirective {
  @Input() withOnHold = false;

  onHold = output();
  onClick = output();
  onHoldStart = output();

  startHoldTime!: number;
  timeoutOnHold: Timeout | null = null;
  timeoutOnHoldStart: Timeout | null = null;

  holdTime = 600;
  clickTime = 200;

  constructor(private fs: FractalService) {}

  @HostListener('mousedown')
  onMouseDown() {
    this.startHoldTime = Date.now();
    if (!this.withOnHold) return;
    this.timeoutOnHoldStart = setTimeout(() => {
      this.onHoldStart.emit();
      this.fs.isHoldAnimationStarted.set(true);
    }, this.clickTime);

    this.timeoutOnHold = setTimeout(() => {
      this.onHold.emit();
      this.fs.isHoldAnimationSucceed.set(true);
    }, this.holdTime);
  }

  @HostListener('mouseup')
  onMouseUp() {
    if (Date.now() - this.startHoldTime < this.clickTime) {
      this.onClick.emit();
    }
    this.reset();
  }

  private reset(): void {
    if (this.timeoutOnHold) {
      clearTimeout(this.timeoutOnHold);
    }
    if (this.timeoutOnHoldStart) {
      clearTimeout(this.timeoutOnHoldStart);
    }
    this.fs.isHoldAnimationStarted.set(false);
    this.fs.isHoldAnimationSucceed.set(false);
  }
}
