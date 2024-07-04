import { Directive, HostListener, output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appClick]',
})
export class ClickDirective {
  singleClick = output<Event>();
  doubleClick = output<Event>();
  holdClick = output<Event>();

  private clickTimeout: unknown;
  private holdTimeout: unknown;
  private clickCount = 0;
  private isHoldEvent = false;

  private static readonly HOLD_DURATION = 500;
  private static readonly DOUBLE_CLICK_DELAY = 300;

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: Event): void {
    this.isHoldEvent = false;
    this.holdTimeout = setTimeout(() => {
      this.isHoldEvent = true;
      this.holdClick.emit(event);
      this.clearClickTimeout();
      this.reset();
    }, ClickDirective.HOLD_DURATION);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel')
  onMouseUp(): void {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout as number);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout as number);
    }

    if (this.isHoldEvent) {
      return;
    }

    this.clickCount++;

    if (this.clickCount === 1) {
      this.clickTimeout = setTimeout(() => {
        if (this.clickCount === 1) {
          this.singleClick.emit(event);
        }
        this.reset();
      }, ClickDirective.DOUBLE_CLICK_DELAY);
    } else if (this.clickCount === 2) {
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout as number);
      }
      this.doubleClick.emit(event);
      this.reset();
    }
  }

  private clearClickTimeout(): void {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout as number);
    }
  }

  private reset(): void {
    this.clickCount = 0;
    this.clearClickTimeout();
  }
}
