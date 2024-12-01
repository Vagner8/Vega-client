import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbar } from '@mat';
import { ManagerComponent } from '../manager/manager.component';
import { CdkDrag, CdkDragRelease } from '@angular/cdk/drag-drop';
import { SettingsButtonComponent } from '../settings/button/settings-button.component';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, ManagerComponent, SettingsButtonComponent, CdkDrag],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent extends SuperComponent {
  onDragReleased(event: CdkDragRelease): void {
    console.log('🚀 ~ event:', event);
  }
}
