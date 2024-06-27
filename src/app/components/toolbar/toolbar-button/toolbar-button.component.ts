import { Component, Input, output } from '@angular/core';
import { TapToolbar } from '@types';
import { MatIcon, MatMiniFabButton, MatProgressSpinnerModule } from '@mat';

@Component({
  selector: 'app-toolbar-button',
  standalone: true,
  imports: [MatMiniFabButton, MatIcon, MatProgressSpinnerModule],
  templateUrl: './toolbar-button.component.html',
  styleUrl: './toolbar-button.component.css',
})
export class ToolbarButtonComponent {
  @Input({ required: true }) tap!: TapToolbar;
  @Input({ required: true }) isFetching!: boolean;

  onClick = output<TapToolbar>();

  spinner(): boolean {
    return this.tap.hasName('pages') && this.isFetching;
  }

  onClicked() {
    this.onClick.emit(this.tap);
  }
}
