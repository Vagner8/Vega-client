import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FractalComponent } from '@components/molecules';
import { RouterOutlet } from '@angular/router';
import { FractalService, StateService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, FractalComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  name = '';

  @Input() set Page(name: string) {
    console.log('🚀 ~ name:', name);
    this.ss.page.set(name);
    this.ss.executer.set('');
    this.name = name;
  }

  constructor(
    public ss: StateService,
    public fls: FractalService,
  ) {}
}
