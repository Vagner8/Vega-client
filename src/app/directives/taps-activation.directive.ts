import { Directive, Input, OnInit, OnChanges } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { MatButton } from '@mat';
import { IFractal, Modifiers } from '@types';

@Directive({
  selector: '[appTapsActivation]',
  standalone: true,
})
export class TapsActivationDirective implements OnChanges, OnInit {
  @Input() tap!: IFractal;
  @Input() rows!: IFractal[];
  @Input() modifier: IFractal | null = null;
  @Input() formRecord: FormRecord | null = null;
  @Input() formRecordChanges: FormRecord | null = null;

  private isEdit = false;
  private isSave = false;
  private isDelete = false;

  constructor(private matButton: MatButton) {}

  ngOnInit(): void {
    this.isEdit = this.tap.is(Modifiers.Edit);
    this.isSave = this.tap.is(Modifiers.Save);
    this.isDelete = this.tap.is(Modifiers.Delete);
    this.matButton.disabled = false;
    if (this.isSave || this.isEdit) {
      this.matButton.disabled = true;
    }
    if (this.modifier?.is(Modifiers.Save) || this.modifier?.is(Modifiers.Delete)) {
      this.formRecord?.disable();
    }
    if (this.isDelete || this.isSave) {
      this.matButton.disabled = this.rows.length === 0;
    }
  }

  ngOnChanges(): void {
    if (this.isEdit || this.isDelete) {
      this.matButton.disabled = this.rows.length === 0;
    }
    if (this.isSave && this.formRecordChanges) {
      this.matButton.disabled = !this.formRecordChanges.dirty;
    }
    if (this.isSave && !this.modifier) {
      this.matButton.disabled = true;
    }
  }
}
