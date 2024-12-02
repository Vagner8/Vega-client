import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { IFractal, Modifiers, Timeout, Toggles } from '@types';
import { SuperComponent } from '@utils';

@Directive({
  selector: '[appTap]',
  standalone: true,
})
export class TapDirective extends SuperComponent implements OnInit, OnDestroy {
  @Input() tap?: IFractal;

  hold = output();
  touch = output();

  private disabled = false;
  private isHoldSucceed = false;

  private holdDelay = 150;
  private holdThreshold = 820;

  private holdTimeout: Timeout | null = null;
  private holdDelayTimeout: Timeout | null = null;

  private el = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  constructor() {
    super();
    const button = this.el.nativeElement;

    effect(() => {
      this.disabled = this.ss.toggles[Toggles.DragAndDrop]();
      this.el.nativeElement.style.cursor = this.disabled ? 'move' : 'pointer';
    });

    effect(() => {
      if (this.ss.toggles[Toggles.DragAndDrop]()) {
        button.disabled = false;
        return;
      }
      switch (this.tap?.cursor) {
        case Modifiers.Save:
          button.disabled = !this.fs.formGroupChanges();
          break;
        case Modifiers.Edit:
        case Modifiers.Delete:
          button.disabled = this.fs.rows.signal().length === 0;
          break;
        default:
          button.disabled = false;
      }
    });
  }

  ngOnInit(): void {
    document.addEventListener('contextmenu', this.onContextmenu);
  }

  ngOnDestroy(): void {
    document.removeEventListener('contextmenu', this.onContextmenu);
  }

  @HostListener('pointerdown')
  pointerdown(): void {
    if (this.disabled) return;
    this.holdDelayTimeout = setTimeout(() => this.es.holdRun$.next(), this.holdDelay);
    this.holdTimeout = setTimeout(() => (this.isHoldSucceed = true), this.holdThreshold);
  }

  @HostListener('pointerup')
  pointerup(): void {
    if (this.disabled) return;
    if (this.isHoldSucceed) {
      this.hold.emit();
      this.es.hold$.next();
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
    this.es.hold$.next();
    this.holdTimeout && clearTimeout(this.holdTimeout);
    this.holdDelayTimeout && clearTimeout(this.holdDelayTimeout);
  }
}
