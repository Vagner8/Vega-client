import { Component, inject, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule, MatButtonModule, MatIcon } from '@mat';
import { SettingsComponent } from '../settings.component';

@Component({
  selector: 'app-settings-button',
  standalone: true,
  imports: [MatButtonModule, MatBottomSheetModule, MatIcon],
  templateUrl: 'settings-button.component.html',
  styleUrl: './settings-button.component.scss',
})
export class SettingsButtonComponent {
  @Input() icon = '';
  private sheet = inject(MatBottomSheet);

  open(): void {
    this.sheet.open(SettingsComponent);
  }
}
