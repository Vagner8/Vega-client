import { Component, inject } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatListModule,
  MatCardModule,
  MatBottomSheetRef,
  MatSelectModule,
  MatFormFieldModule,
} from '@mat';
import { SuperComponent } from '@utils';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { IFractal } from '@types';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent extends SuperComponent {
  sheetRef = inject(MatBottomSheetRef);
  isChecked = false;

  toggle(setting: IFractal): void {
    const { value } = setting.getFormControl('Toggle');
    this.ss.toggles.update(prev => ({ ...prev, [setting.cursor]: value }));

    console.log('🚀 ~ setting:', this.fs.settings()?.find('Menu')?.formGroup);
  }

  select(setting: IFractal): void {
    const { value } = setting.getFormControl('Select');
    this.ss.selects.update(prev => ({ ...prev, [setting.cursor]: value }));

    console.log('🚀 ~ setting:', this.ss.selects());
  }
}
