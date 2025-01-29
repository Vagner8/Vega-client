import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { Modifiers } from '@types';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, SelectService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormCardComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent implements OnInit, OnDestroy {
  ds = inject(DataService);
  ss = inject(SelectService);
  ms = inject(ModifiersService);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    console.log('🚀 ~ this.ss.$toAdd:', this.ss.$toAdd());

    this.subs.push(
      this.ms.hold$.subscribe(modifier => {
        const toAdd = this.ss.$toAdd();
        const toUpdate = this.ss.$toUpdate();
        switch (modifier?.cursor) {
          case Modifiers.Save:
            if (toAdd.length > 0) {
              this.ds.add(toAdd.map(fractal => fractal.updateFractalByForm())).subscribe();
            }
            if (toUpdate.length > 0) {
              this.ds.update(toUpdate.map(fractal => fractal.updateFractalByForm())).subscribe();
            }
            break;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
