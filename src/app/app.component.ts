import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { Fractals } from '@types';
import {
  DataService,
  FractalService,
  CollectionsService,
  ManagerService,
  ModifiersService,
} from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ds = inject(DataService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  mgr = inject(ManagerService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const root = this.fs.toFractal(dto);
      this.cs.collections = root.find(Fractals.Collections);
      this.mgr.manager = root.find(Fractals.Manager);
      this.ms.modifiers = root.find(Fractals.Modifiers);
      this.fs.$root.set(root);
    });
  }
}
