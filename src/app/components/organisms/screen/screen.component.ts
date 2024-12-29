import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CollectionComponent } from '@components/atoms';
import { Events, Fractals, IFractal } from '@types';
import {
  RootService,
  CollectionsService,
  ManagerService,
  ModifiersService,
  RowsService,
  TapsService,
  UpdateService,
} from '@services';
import { ModifierComponent } from '../modifier/modifier.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [CollectionComponent, ControlPanelComponent, ModifierComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent implements OnInit {
  ts = inject(TapsService);
  rs = inject(RowsService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  rts = inject(RootService);
  mgr = inject(ManagerService);

  us = inject(UpdateService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Manager = '';
  @Input() Modifier = '';
  @Input() Collections = '';

  ngOnInit(): void {
    this.init();
  }

  async rowHeld(collection: IFractal): Promise<void> {
    await this.rs.hold(collection);
    this.openSidenav();
  }

  private openSidenav(): void {
    if (this.mgr.$event() !== Events.Touch) {
      this.mgr.set(Events.Touch);
    }
    if (this.ts.$current()?.is(Fractals.Collections)) {
      // this.ts.set(this.ms.parent);
    }
  }

  private init(): void {
    const { Rows, Taps, Collections, Manager, Modifier } = this;
    this.cs.init({ root: this.rts.current, Collections });
    this.rs.init({ Rows, collection: this.cs.current });
    this.ms.init({ root: this.rts.current, Modifier });
    this.ts.init({
      Taps,
      modifiers: this.rts.current.find(Fractals.Modifiers),
      collections: this.rts.current.find(Fractals.Collections),
    });
    this.mgr.init({ Manager });
    // [Modifiers.Delete, Modifiers.Save].some(modifier => modifier === Modifier)
    // && this.cs.current.formArray.disable();
  }
}
