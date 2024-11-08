import { Component } from '@angular/core';
import { MatToolbar } from '@mat';
import { ManagerComponent } from '@components/atoms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, ManagerComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {}
