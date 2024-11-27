import { Directive, HostListener, output } from '@angular/core';
import { FractalService } from '@services';
import { Timeout } from '@types';

@Directive({
  selector: '[appEvent]',
  standalone: true,
})
export class EventDirective {
  hold = output();
  touch = output();

  private isHoldSucceed = false;

  private holdDelay = 150;
  private holdThreshold = 820;

  private holdTimeout: Timeout | null = null;
  private holdDelayTimeout: Timeout | null = null;

  constructor(private fs: FractalService) {}

  @HostListener('pointerdown')
  pointerdown(): void {
    this.holdDelayTimeout = setTimeout(() => this.fs.holdRun$.next(), this.holdDelay);
    this.holdTimeout = setTimeout(() => (this.isHoldSucceed = true), this.holdThreshold);
  }

  @HostListener('pointerup')
  pointerup(): void {
    if (this.isHoldSucceed) {
      this.hold.emit();
      this.fs.hold$.next();
      this.cancel();
    } else {
      this.touch.emit();
      this.cancel();
    }
  }

  @HostListener('pointerleave')
  pointerleave(): void {
    this.cancel();
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu(event: Event): void {
    event.preventDefault();
  }

  private cancel(): void {
    this.isHoldSucceed = false;
    this.fs.hold$.next();
    this.holdTimeout && clearTimeout(this.holdTimeout);
    this.holdDelayTimeout && clearTimeout(this.holdDelayTimeout);
  }
}
