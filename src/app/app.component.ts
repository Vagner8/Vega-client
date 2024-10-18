import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService, StateService } from '@services';
import { Roots } from '@types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    public ss: StateService,
    public fs: FractalService,
    private ds: DataService
  ) {}

  ngOnInit(): void {
    this.ds.fractal.get().subscribe(dto => {
      const root = this.fs.toFractal(dto);
      this.ss.root.set(root);
      this.ss.managerTap.set(root.find(Roots.Manager));
      this.ss.sidenavTaps.set(root.find(Roots.Pages));
    });
  }
}
