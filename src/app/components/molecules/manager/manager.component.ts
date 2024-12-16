import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { Events, Fractals, FractalsParams } from '@types';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  BaseService,
  EventService,
  CollectionsService,
  ManagerService,
  ModifiersService,
  TapsService,
} from '@services';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatButtonModule, SpinnerComponent, TapDirective, AsyncPipe],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent implements OnInit {
  showSpinner$!: Observable<boolean>;
  prevEvent: keyof typeof Events | null = null;

  bs = inject(BaseService);
  ts = inject(TapsService);
  cs = inject(CollectionsService);
  es = inject(EventService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  ngOnInit(): void {
    this.showSpinner$ = merge(
      this.es.holdRun$.pipe(map(() => true)),
      this.es.holdEnd$.pipe(map(() => false))
    );
  }

  async holdAndRTouch(event: keyof typeof Events): Promise<void> {
    if (this.prevEvent !== event) {
      await this.mgr.set(event);
    }
    if (event === Events.Touch && this.prevEvent !== Events.Hold) {
      this.ts.$taps.update(prev =>
        prev?.is(Fractals.Collections) ? this.ms.modifiers : this.cs.collections
      );
      await this.bs.navigate({ [FractalsParams.Taps]: this.ts.$taps()?.cursor });
    }
    this.prevEvent = event;
  }
}
