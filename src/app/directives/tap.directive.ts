import { Directive, HostListener, Input, OnDestroy, OnInit, output } from '@angular/core';
import { IFractal, Timeout } from '@types';
import { SuperComponent } from '@utils';

@Directive({
  selector: '[appTap]',
  standalone: true,
})
export class TapDirective extends SuperComponent implements OnInit, OnDestroy {
  @Input() tap?: IFractal;

  hold = output();
  touch = output();

  private isHoldSucceed = false;

  private holdDelay = 150;
  private holdThreshold = 820;

  private holdTimeout: Timeout | null = null;
  private holdDelayTimeout: Timeout | null = null;

  ngOnInit(): void {
    document.addEventListener('contextmenu', this.onContextmenu);
  }

  ngOnDestroy(): void {
    document.removeEventListener('contextmenu', this.onContextmenu);
  }

  @HostListener('pointerdown')
  pointerdown(): void {
    this.holdDelayTimeout = setTimeout(() => this.es.holdRun$.next(), this.holdDelay);
    this.holdTimeout = setTimeout(() => (this.isHoldSucceed = true), this.holdThreshold);
  }

  @HostListener('pointerup')
  pointerup(): void {
    if (this.isHoldSucceed) {
      this.hold.emit();
      this.es.holdEnd$.next();
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

  private onContextmenu = (event: Event): void => {
    event.preventDefault();
  };

  private cancel(): void {
    this.isHoldSucceed = false;
    this.es.holdEnd$.next();
    this.holdTimeout && clearTimeout(this.holdTimeout);
    this.holdDelayTimeout && clearTimeout(this.holdDelayTimeout);
  }
}