import { ChangeDetectionStrategy, Component, Input, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@mat';
import { ActiveComponent } from '@components/molecules';
import { RouterOutlet } from '@angular/router';
import { StateService, FractalService } from '@services';
import { FractalDto } from '@types';
import { sortIndicator } from '@utils';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatTableModule, ActiveComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  dataSource = computed(() => this.computedDataSource());
  displayedColumns = computed(() => this.computedDisplayedColumns());

  @Input() set Page(name: string) {
    this.ss.page.set(name);
    this.ss.executer.set('');
  }

  constructor(
    private ss: StateService,
    private fls: FractalService,
  ) {}

  get dto(): WritableSignal<FractalDto | null> {
    return this.fls.dto;
  }

  get isFetching() {
    return this.ss.isFetching;
  }

  get error() {
    return this.ss.error;
  }

  computedDataSource(): FractalDto[] {
    return Object.values(this.dto()?.fractals[this.ss.page()].fractals || []);
  }

  computedDisplayedColumns(): string[] {
    return sortIndicator(this.dto()?.fractals[this.ss.page()].controls);
  }
}
