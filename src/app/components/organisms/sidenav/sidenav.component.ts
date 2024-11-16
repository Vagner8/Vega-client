import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@mat';
import { FractalService } from '@services';
import { SidenavTapsComponent } from '@components/molecules';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, SidenavTapsComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(public fs: FractalService) {}
}
