import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CollectionComponent } from '@components/atoms';
import { Events, Fractals, IFractal, Modifiers } from '@types';
import {
  BaseService,
  FractalService,
  CollectionsService,
  ManagerService,
  ModifiersService,
  RowsService,
  TapsService,
} from '@services';
import { AppModifierComponent } from '../app-modifier/app-modifier.component';
import { RowsModifierComponent } from '../rows-modifier/rows-modifier.component';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [CollectionComponent, AppModifierComponent, RowsModifierComponent],
  templateUrl: './screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenComponent implements OnInit {
  bs = inject(BaseService);
  ts = inject(TapsService);
  cs = inject(CollectionsService);
  rs = inject(RowsService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Collections = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  ngOnInit(): void {
    this.init();
  }

  async rowHeld(collection: IFractal): Promise<void> {
    await this.rs.hold(collection);
    this.openSidenav();
  }

  async rowTouched(row: IFractal): Promise<void> {
    await this.rs.set(row);
    this.openSidenav();
  }

  private openSidenav(): void {
    if (this.mgr.$event() !== Events.Touch) {
      this.mgr.set(Events.Touch);
    }
    if (this.ts.$taps()?.is(Fractals.Collections)) {
      this.ts.set(this.ms.modifiers);
    }
  }

  private init(): void {
    const { Rows, Taps, Collections, Manager, Modifier } = this;
    this.cs.init({ Collections });
    this.rs.init({ Rows, collection: this.cs.collection });
    this.ms.init({ Modifier });
    this.ts.init({ Taps, lists: this.cs.collections, modifiers: this.ms.modifiers });
    this.mgr.init({ Manager });
    [Modifiers.Delete, Modifiers.Save].some(modifier => modifier === Modifier) &&
      this.cs.collection.formArray.disable();
  }
}
