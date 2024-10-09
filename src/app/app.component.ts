import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { FetchService, FractalService, StoreService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    public ss: StoreService,
    private fs: FractalService,
    private fetch: FetchService
  ) {}

  ngOnInit(): void {
    this.fetch.fractal.get().subscribe(dto => this.ss.root.add(this.fs.toFractal(dto)));
  }
}
