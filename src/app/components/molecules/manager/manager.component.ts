import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule, MatIcon } from '@mat';
import { EventDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { EventService, FractalService } from '@services';
import { Events, Types } from '@types';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatButtonModule, SpinnerComponent, MatIcon, EventDirective, AsyncPipe],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent implements OnInit {
  switcher$!: Observable<boolean>;

  constructor(
    public fs: FractalService,
    private es: EventService
  ) {}

  ngOnInit(): void {
    this.switcher$ = merge(
      this.es.holdRun$.pipe(map(() => true)),
      this.es.hold$.pipe(map(() => false)),
      this.es.holdCancel$.pipe(map(() => false))
    );
  }

  async onManagerTapOut(): Promise<void> {
    const taps = this.fs[this.fs.taps.is(Types.Pages) ? 'modifiers' : 'pages'];
    this.fs.managerEvent.signal() === Events.Click && (await this.fs.taps.set(taps));
    this.fs.managerEvent.set(Events.Click);
  }

  onManagerStopHoldOut(): void {
    this.fs.managerEvent.set(Events.Hold);
  }
}
