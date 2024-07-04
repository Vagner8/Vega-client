import { Component } from '@angular/core';
import { MatToolbar } from '@mat';
import { ManagerComponent } from '../manager/manager.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, ManagerComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {}
