import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DOMService {
  constructor(private _renderer: Renderer2) { }

  public scrollToBottom(elementRef: ElementRef): boolean {
    if (elementRef && elementRef.nativeElement) {
      const element = elementRef.nativeElement;
      this._renderer.setProperty(element, 'scrollTop', element.scrollHeight);
    }
    throw Error(`No native element to set scroll to bottom`)
  }
}
