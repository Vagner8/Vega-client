import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { Fractals } from '@types';
import {
  DataService,
  FractalService,
  ListService,
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
  ls = inject(ListService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const root = this.fs.toFractal(dto);
      this.ls.lists = root.find(Fractals.Lists);
      this.mgr.manager = root.find(Fractals.Manager);
      this.ms.modifiers = root.find(Fractals.Modifiers);
      this.fs.$root.set(root);
    });
  }
}
