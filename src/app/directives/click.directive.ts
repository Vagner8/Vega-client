import { Directive, HostListener, input, output } from '@angular/core';
import { FractalService } from '@services';
import { Timeout } from '@types';

@Directive({
  selector: '[appClick]',
  standalone: true,
})
export class ClickDirective {
  activateOnHold = input(false);
  onHold = output();
  onClick = output();
  onHoldStart = output();

  private startHoldTime!: number;
  private timeoutOnHold: Timeout | null = null;
  private timeoutOnHoldStart: Timeout | null = null;
  private holdTime = 830;
  private clickTime = 200;

  constructor(private fs: FractalService) {}

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onStart(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.startHoldTime = Date.now();

    if (!this.activateOnHold) return;

    this.timeoutOnHoldStart = setTimeout(() => {
      this.onHoldStart.emit();
      this.fs.holding.go.set(true);
    }, this.clickTime);

    this.timeoutOnHold = setTimeout(() => {
      this.onHold.emit();
      this.fs.holding.end.set(true);
      this.fs.holding.reset();
    }, this.holdTime);
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onEnd(event: MouseEvent | TouchEvent): void {
    event.preventDefault();

    if (Date.now() - this.startHoldTime < this.clickTime) {
      this.onClick.emit();
    }
    this.reset();
  }

  private reset(): void {
    if (this.timeoutOnHold) {
      clearTimeout(this.timeoutOnHold);
      this.timeoutOnHold = null;
    }
    if (this.timeoutOnHoldStart) {
      clearTimeout(this.timeoutOnHoldStart);
      this.timeoutOnHoldStart = null;
    }
    this.fs.holding.reset();
  }
}
