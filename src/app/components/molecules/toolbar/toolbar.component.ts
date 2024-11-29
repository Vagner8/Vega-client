import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbar } from '@mat';
import { ManagerComponent } from '../manager/manager.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, ManagerComponent, CdkDrag],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
