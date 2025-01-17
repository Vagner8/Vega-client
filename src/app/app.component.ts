import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { Fractals } from '@types';
import { DataService, ManagerService, ModifiersService, SelectService } from '@services';
import { fractalFactory } from '@fractal';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  bs = inject(BaseService);
  ds = inject(DataService);
  ms = inject(ModifiersService);
  ss = inject(SelectService);
  mgr = inject(ManagerService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const root = fractalFactory(dto);
      this.ms.modifiers = root.find(Fractals.Modifiers);
      this.bs.collections = root.find(Fractals.Collections);
      this.mgr.manager = root.find(Fractals.Manager);
      this.bs.$root.set(root);
      console.log('🚀 ~ root:', root);
    });
  }
}
