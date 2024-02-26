import { Component, Input, WritableSignal } from '@angular/core';
import { MatIcon } from '@mat';
import { IconType, RoutingType, TriggersType } from '@types';

@Component({
  selector: 'app-triggers',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './triggers.component.html',
  styleUrl: './triggers.component.css',
})
export class TriggersComponent {
  @Input() public drawerTrigger!: keyof TriggersType.Triggers;

  public buttons: TriggersType.Triggers = {
    actions: [
      { text: 'Create', iconName: 'add' },
      { text: 'Edit', iconName: 'edit' },
      { text: 'Delete', iconName: 'delete' },
    ],
    pages: [
      {
        text: 'Home',
        iconName: 'home',
        routerLink: RoutingType.RouterLink.Home,
      },
      {
        text: 'Users',
        iconName: 'group',
        routerLink: RoutingType.RouterLink.Users,
      },
    ],
    settings: [],
  };
}
