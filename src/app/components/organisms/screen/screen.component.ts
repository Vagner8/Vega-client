import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CollectionComponent } from '@components/atoms';
import { Events, Fractals } from '@types';
import {
  RootService,
  CollectionsService,
  ManagerService,
  ModifiersService,
  TapsService,
  SelectService,
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
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  rts = inject(RootService);
  mgr = inject(ManagerService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Manager = '';
  @Input() Modifier = '';
  @Input() Collections = '';

  ngOnInit(): void {
    this.init();
  }

  private openSidenav(): void {
    if (this.mgr.$event() !== Events.Touch) {
      this.mgr.set(Events.Touch);
    }
    if (this.ts.$fractal()?.is(Fractals.Collections)) {
      // this.ts.set(this.ms.parent);
    }
  }

  private init(): void {
    const { Taps, Collections, Manager, Modifier } = this;
    const root = this.rts.fractal;
    this.cs.init({ root, Collections });
    this.ms.init({ root, Modifier });
    this.ts.init({
      Taps,
      modifiers: this.ms.modifiers,
      collections: this.cs.collections,
    });
    this.mgr.init({ Manager });
    // [Modifiers.Delete, Modifiers.Save].some(modifier => modifier === Modifier)
    // && this.cs.current.formArray.disable();
  }
}
