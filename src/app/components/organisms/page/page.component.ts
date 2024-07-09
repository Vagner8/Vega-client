import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActiveComponent, TableComponent } from '@components/molecules';
import { RouterOutlet } from '@angular/router';
import { StateService, FractalService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, ActiveComponent, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  selectedRows = new Set<Fractal>();

  @Input() set Page(name: string) {
    this.ss.page.set(name);
    this.ss.executer.set('');
  }

  constructor(
    public ss: StateService,
    public fls: FractalService,
  ) {}

  onClickRow(row: Fractal) {
    if (this.selectedRows.has(row)) this.selectedRows.delete(row);
    else this.selectedRows.add(row);
    if (this.selectedRows.size) this.ss.sidenav.set('open');
  }
}
