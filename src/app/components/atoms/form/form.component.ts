import { Component, Input, input, output, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIcon, MatInputModule } from '@mat';
import { FractalService } from '@services';
import { IFractal } from '@types';
import { Unsubscriber } from '@utils';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnDestroy, OnInit {
  @Input() row!: IFractal;
  sort = input<string[]>([]);
  inputOut = output<IFractal>();
  prevRawValue!: Record<string, string>;

  unsubscriber = new Unsubscriber();

  constructor(private fs: FractalService) {}

  ngOnInit(): void {
    this.prevRawValue = this.row.formGroup?.getRawValue();
    this.unsubscriber.set(
      this.fs.disableFormGroups.subscribe(disabled =>
        this.row.formGroup[disabled ? 'disable' : 'enable']()
      )
    );
  }

  ngOnDestroy(): void {
    this.row.formGroup.reset(this.prevRawValue);
    this.unsubscriber.clear();
  }

  onClick(input: HTMLInputElement): void {
    input.value = '';
    this.row.formGroup?.markAsDirty();
  }
}
