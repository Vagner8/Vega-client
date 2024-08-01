import { Directive, HostListener, Input, output } from '@angular/core';
import { FractalService, TapService } from '@services';
import { ClickInfo, TapInfo } from '@types';

@Directive({
  standalone: true,
  selector: '[appClick]',
})
export class ClickDirective {
  @Input() info!: TapInfo;

  onClick = output<ClickInfo>();
  onHoldClick = output<ClickInfo>();
  onDoubleClick = output<ClickInfo>();

  private clickTimeout: unknown;
  private holdTimeout: unknown;
  private clickCount = 0;
  private isHoldEvent = false;

  private static readonly HOLD_DURATION = 500;
  private static readonly DOUBLE_CLICK_DELAY = 200;

  constructor(
    public ts: TapService,
    public fls: FractalService,
  ) {}

  @HostListener('contextmenu', ['$event'])
  onContextMenuHostListener(event: MouseEvent): void {
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart.passive', ['$event'])
  onMouseDownHostListener(event: Event): void {
    this.isHoldEvent = false;
    this.holdTimeout = setTimeout(() => {
      this.isHoldEvent = true;
      this.onHoldClick.emit({ click: 'Hold', event, tap: this.info });
      this.clearClickTimeout();
      this.reset();
    }, ClickDirective.HOLD_DURATION);
  }

  @HostListener('mouseup')
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel')
  onMouseUpHostListener(): void {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout as number);
    }
  }

  @HostListener('click', ['$event'])
  onClickHostListener(event: Event): void {
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
          this.onClick.emit({ click: 'Click', event, tap: this.info });
        }
        this.reset();
      }, ClickDirective.DOUBLE_CLICK_DELAY);
    } else if (this.clickCount === 2) {
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout as number);
      }
      this.onDoubleClick.emit({ click: 'Double', event, tap: this.info });
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
