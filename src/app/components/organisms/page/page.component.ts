import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@mat';
import { ActiveComponent } from '@components/molecules';
import { RouterOutlet } from '@angular/router';
import { StateService, UnitService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatTableModule, ActiveComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input() set Page(name: string) {
    // this.name.set(name);
    this.ss.page.set(name);
    this.ss.executer.set('');
  }

  constructor(
    private ss: StateService,
    private us: UnitService,
  ) {}

  ngAfterContentChecked() {
    console.log('🚀 ~ us:', this.us.dto);
  }

  get isFetching() {
    return this.ss.isFetching;
  }

  get error() {
    return this.ss.error;
  }
}
