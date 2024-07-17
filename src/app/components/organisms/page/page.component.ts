import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FractalComponent } from '@components/molecules';
import { FractalService, StateService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [FractalComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input() set Page(name: string) {
    this.fls.key.set(name);
  }

  constructor(
    public ss: StateService,
    public fls: FractalService,
  ) {}
}
