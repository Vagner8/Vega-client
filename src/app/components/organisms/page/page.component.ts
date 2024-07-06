import { ChangeDetectionStrategy, Component, Input, WritableSignal, computed } from '@angular/core';
import { ActiveComponent } from '@components/molecules';
import { RouterOutlet } from '@angular/router';
import { StateService, FractalService } from '@services';
import { Exception, Fractal } from '@types';
import { TableComponent } from '@components/atoms';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, ActiveComponent, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  dataSource = computed(() => this.computedDataSource());
  displayedColumns = computed(() => this.computedDisplayedColumns());

  selectedRows = new Set<Fractal>();

  @Input() set Page(name: string) {
    this.ss.page.set(name);
    this.ss.executer.set('');
  }

  constructor(
    private ss: StateService,
    private fls: FractalService,
  ) {}

  ngDoCheck() {
    console.log('🚀 ~ clickedRows:', this.selectedRows);
  }

  get fractal(): WritableSignal<Fractal | null> {
    return this.fls.fractal;
  }

  get isFetching(): WritableSignal<boolean> {
    return this.ss.isFetching;
  }

  get error(): WritableSignal<Exception | null> {
    return this.ss.error;
  }

  onClickRow(row: Fractal) {
    if (this.selectedRows.has(row)) this.selectedRows.delete(row);
    else this.selectedRows.add(row);
    if (this.selectedRows.size) this.ss.sidenav.set('open');
  }

  private computedDataSource(): Fractal[] {
    return this.fractal()?.childArr(this.ss.page()) || [];
  }

  private computedDisplayedColumns(): string[] {
    return this.fractal()?.childSort(this.ss.page()) || [];
  }
}
