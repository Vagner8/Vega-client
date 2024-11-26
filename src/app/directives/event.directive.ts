import { Directive, HostListener, output, OnInit, ElementRef } from '@angular/core';
import { FractalService } from '@services';
import Hammer from 'hammerjs';

@Directive({
  selector: '[appEvent]',
  standalone: true,
})
export class EventDirective implements OnInit {
  private time = 0;
  private threshold = 820;

  tapOut = output();
  holdRunOut = output();
  holdDoneOut = output();
  holdCancelOut = output();

  constructor(
    private el: ElementRef,
    private fs: FractalService
  ) {}

  ngOnInit(): void {
    const hammer = new Hammer(this.el.nativeElement);

    hammer.on('press', () => {
      this.time = Date.now();
      this.holdRunOut.emit();
      this.fs.holdRun$.next();
    });

    hammer.on('pressup', () => {
      if (Date.now() - this.time > this.threshold) {
        this.holdDoneOut.emit();
        this.fs.holdDone$.next();
      } else {
        this.holdCancelOut.emit();
        this.fs.cancelHold$.next();
      }
    });

    hammer.on('tap', () => {
      this.tapOut.emit();
    });

    hammer.on('panend', () => {
      this.holdCancelOut.emit();
      this.fs.cancelHold$.next();
    });
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu(event: Event): void {
    event.preventDefault();
  }
}
