import { Component, inject, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule, MatButtonModule, MatIcon } from '@mat';
import { SettingsComponent } from '../settings.component';
import { TapDirective } from '@directives';
import { DataService } from '@services';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-settings-button',
  standalone: true,
  imports: [MatButtonModule, MatBottomSheetModule, MatIcon, TapDirective],
  templateUrl: 'settings-button.component.html',
  styleUrl: './settings-button.component.scss',
})
export class SettingsButtonComponent extends SuperComponent {
  // @Input() fractal!: IFractal;
  // ds = inject(DataService);
  // sheet = inject(MatBottomSheet);
  // hold(): void {
  //   this.ds.update(Array.from(this.ss.changes)).subscribe();
  // }
  // touch(): void {
  //   this.sheet.open(SettingsComponent);
  // }
}
