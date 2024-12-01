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
}
