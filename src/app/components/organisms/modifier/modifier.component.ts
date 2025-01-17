import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { MatButtonModule, MatCardModule } from '@mat';
import { DataService, ModifiersService, SelectService } from '@services';
import { Modifiers } from '@types';
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
    const fractal = this.ss.$parent();
    const fractals = this.ss.$children();
    this.subs.push(
      this.ms.hold$.subscribe(modifier => {
        switch (modifier?.cursor) {
          case Modifiers.Save:
            this.ds.update(fractal ? [fractal.update()] : fractals.map(fractal => fractal.update())).subscribe();
            break;
        }
      })
    );

    this.subs.push(
      this.ms.touch$.subscribe(modifier => {
        switch (modifier?.cursor) {
          case Modifiers.New:
            this.ss.$parent();
            this.ss.push(this.ss.$parent()!.createChild());
            break;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
