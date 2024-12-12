import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@mat';
import { TapDirective } from '@directives';
import { SpinnerComponent } from '@components/atoms';
import { Events, Types } from '@types';
import { map, merge, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatButtonModule, SpinnerComponent, TapDirective, AsyncPipe],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerComponent extends SuperComponent implements OnInit {
  showSpinner$!: Observable<boolean>;
  prevEvent: keyof typeof Events | null = null;

  ngOnInit(): void {
    this.showSpinner$ = merge(
      this.es.holdRun$.pipe(map(() => true)),
      this.es.holdEnd$.pipe(map(() => false))
    );
  }

  async event(event: keyof typeof Events): Promise<void> {
    if (this.prevEvent !== event) {
      await this.navigate({ [Types.Manager]: event });
      this.fs.managerEvent.set(event);
    }
    if (event === Events.Touch && this.prevEvent !== Events.Hold) {
      this.fs.taps.update(prev => (prev?.is(Types.Lists) ? this.fs.modifiers : this.fs.pages));
      await this.navigate({ [Types.Taps]: this.fs.taps()?.cursor });
    }
    this.prevEvent = event;
  }
}
