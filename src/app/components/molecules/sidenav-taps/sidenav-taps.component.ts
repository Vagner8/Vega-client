import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { FractalService } from '@services';
import { IFractal, Modifiers, Pages, Types } from '@types';

@Component({
  selector: 'app-sidenav-taps',
  standalone: true,
  imports: [TapComponent, MatListModule],
  templateUrl: './sidenav-taps.component.html',
  styleUrl: './sidenav-taps.component.css',
})
export class SidenavTapsComponent {
  constructor(
    public fs: FractalService,
    private router: Router
  ) {}

  disabled(cursor: string) {
    const fractals = this.fs.rows.fractals();
    switch (cursor) {
      case Modifiers.Save:
        return fractals[0] ? !fractals[0].formGroup.data.dirty : true;
      case Modifiers.Delete:
        return fractals.length === 0;
      case Modifiers.Edit:
        return fractals.length !== 1;
      default:
        return false;
    }
  }

  onClick(tap: IFractal): void {
    const isPages = tap.isType(Pages);
    if (isPages) {
      this.fs.page.set(tap);
      this.fs.rows.fractals.set([]);
    } else {
      this.fs.modifier.set(tap);
      if (tap.isCursor(Modifiers.New)) {
        this.fs.cloneRow(this.fs.page());
      }
    }
    this.navigation(tap, isPages);
  }

  onHold(tap: IFractal): void {
    if (tap.isCursor(Modifiers.Save)) {
      this.fs.update();
    }
    if (tap.isCursor(Modifiers.Delete)) {
      this.fs.delete();
    }
  }

  private navigation(tap: IFractal, isPages: boolean): void {
    this.router.navigate(isPages ? [tap.cursor] : [], {
      queryParams: isPages
        ? { [Types.Manager]: this.fs.managerEvent() }
        : { [Types.Modifiers]: tap.cursor },
      queryParamsHandling: isPages ? null : 'merge',
    });
  }
}
