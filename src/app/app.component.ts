import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { Fractals } from '@types';
import { DataService, RootService, CollectionsService, ManagerService, ModifiersService } from '@services';
import { Fractal } from '@utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ds = inject(DataService);
  ms = inject(ModifiersService);
  cs = inject(CollectionsService);
  rts = inject(RootService);
  mgr = inject(ManagerService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const root = Fractal.create(dto, null);
      console.log('🚀 ~ root:', root);
      this.ms.parent = root.find(Fractals.Modifiers);
      this.cs.parent = root.find(Fractals.Collections);
      this.mgr.$current.set(root.find(Fractals.Manager));
      this.rts.$current.set(root);
    });
  }
}
