import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appClick]',
  standalone: true,
})
export class ClickDirective {
  onHold = output();
  onClick = output();
  onHoldStart = output();

  isHold = false;
  timeout: ReturnType<typeof setTimeout> | null = null;
  startHold!: number;

  @HostListener('mousedown')
  onMouseDown() {
    this.isHold = true;
    this.startHold = Date.now();
    this.onHoldStart.emit();
    this.timeout = setTimeout(() => {
      if (this.isHold) {
        this.onHold.emit();
      }
    }, 500);
  }

  @HostListener('mouseup')
  onMouseUp() {
    if (Date.now() - this.startHold < 200) {
      this.onClick.emit();
    }
    this.reset();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.reset();
  }

  private reset(): void {
    this.isHold = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
