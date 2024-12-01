import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@mat';
import { SidenavTapsComponent } from '@components/molecules';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, SidenavTapsComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent extends SuperComponent {
  position = computed(() => this.ss.selects['Menu']() as 'start' | 'end');
}
