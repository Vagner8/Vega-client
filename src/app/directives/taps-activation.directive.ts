import { Directive, OnInit, OnChanges, Input } from '@angular/core';
import { MatButton } from '@mat';
import { FractalService } from '@services';
import { IFractal, Modifiers } from '@types';

@Directive({
  selector: '[appTapsActivation]',
  standalone: true,
})
export class TapsActivationDirective implements OnChanges, OnInit {
  @Input() tap!: IFractal;
  @Input() rows!: IFractal[];
  @Input() formGroupChanges: IFractal | null = null;

  constructor(
    private fs: FractalService,
    private matButton: MatButton
  ) {}

  ngOnInit(): void {
    this.tapsActivation();
  }

  ngOnChanges(): void {
    this.tapsActivation();
  }

  private tapsActivation(): void {
    switch (this.tap.cursor) {
      case Modifiers.Save:
        this.matButton.disabled = !this.fs.formGroupChanges();
        break;
      case Modifiers.Edit:
        this.matButton.disabled = this.rows.length === 0;
        break;
      case Modifiers.Delete:
        this.matButton.disabled = this.rows.length === 0;
        break;
      default:
        this.matButton.disabled = false;
    }
  }
}
