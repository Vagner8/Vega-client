import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbar } from '@mat';
import { ManagerComponent } from '../manager/manager.component';
import { SettingsButtonComponent } from '../settings/button/settings-button.component';
import { SuperComponent } from '@utils';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { PositionDirective } from '@directives';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, ManagerComponent, SettingsButtonComponent, PositionDirective, CdkDrag],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent extends SuperComponent {}
