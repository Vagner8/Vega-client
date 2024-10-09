import { Component } from '@angular/core';
import { MatProgressSpinner, MatToolbar } from '@mat';
import { ManagerComponent } from '@components/atoms';
import { StoreService } from '@services';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, ManagerComponent, MatProgressSpinner],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  constructor(public ss: StoreService) {}
}
