import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, FractalService, MapService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public fs: FractalService,
    private ms: MapService,
    private ds: DataService
  ) {}

  ngOnInit(): void {
    this.ds.get().subscribe(dto => this.fs.root.set(this.ms.toFractal(dto)));
  }
}
