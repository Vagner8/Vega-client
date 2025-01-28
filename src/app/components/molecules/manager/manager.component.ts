import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { Events, FractalEntities } from '@types';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EventService, ManagerService, ModifiersService, TapsService, SelectService } from '@services';
import { BaseService } from 'app/services/base.service';

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

  ts = inject(TapsService);
  bs = inject(BaseService);
  es = inject(EventService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  ngOnInit(): void {
    this.showSpinner$ = merge(this.es.holdRun$.pipe(map(() => true)), this.es.holdEnd$.pipe(map(() => false)));
  }

  async holdAndTouch(event: keyof typeof Events): Promise<void> {
    if (this.prevEvent !== event) {
      await this.mgr.set(event);
    }
    if (event === Events.Touch && this.prevEvent !== Events.Hold) {
      this.ts.$taps.update(prev => (prev?.is(FractalEntities.Collections) ? this.ms.modifiers : this.bs.collections));
      await this.bs.navigate({ [FractalEntities.Taps]: this.ts.$taps()?.cursor });
    }
    this.prevEvent = event;
  }
}
