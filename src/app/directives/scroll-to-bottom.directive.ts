import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  RendererFactory2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
  standalone: true,
})
export class ScrollToBottomDirective implements AfterViewInit {
  @Input() appCssSelector?: string;
  private _renderer: Renderer2;

  constructor(
    private _elementRef: ElementRef,
    rendererFactory: RendererFactory2,
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  public ngAfterViewInit(): void {
    this._scrollToBottom();
  }

  private _scrollToBottom(): void {
    if (!this.appCssSelector)
      return this._setScroll(this._elementRef.nativeElement);
    const scrollableElement = this._elementRef.nativeElement.querySelector(
      this.appCssSelector,
    );
    if (!scrollableElement) return;
    this._setScroll(scrollableElement);
  }

  private _setScroll(element: HTMLElement): void {
    const newPosition = element.scrollHeight;
    this._renderer.setProperty(element, 'scrollTop', newPosition);
  }
}
