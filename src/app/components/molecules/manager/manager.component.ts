import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { Events, Fractals, FractalsParams } from '@types';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BaseService } from '@services';

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

  ngOnInit(): void {
    this.showSpinner$ = merge(
      this.bs.es.holdRun$.pipe(map(() => true)),
      this.bs.es.holdEnd$.pipe(map(() => false))
    );
  }

  async holdAndRTouch(event: keyof typeof Events): Promise<void> {
    if (this.prevEvent !== event) {
      this.bs.mgr.$event.set(event);
      await this.bs.navigate({ [FractalsParams.Manager]: event });
    }
    if (event === Events.Touch && this.prevEvent !== Events.Hold) {
      this.bs.ts.$taps.update(prev =>
        prev?.is(Fractals.Lists) ? this.bs.ms.modifiers : this.bs.ls.lists
      );
      await this.bs.navigate({ [FractalsParams.Taps]: this.bs.ts.$taps()?.cursor });
    }
    this.prevEvent = event;
  }
}
