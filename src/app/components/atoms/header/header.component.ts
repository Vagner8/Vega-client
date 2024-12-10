import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends SuperComponent {}
