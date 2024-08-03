import { Component, OnInit } from '@angular/core';
import { SidenavComponent, ToolbarComponent } from '@components/molecules';
import { HeaderComponent } from '@components/atoms';
import { RouterOutlet } from '@angular/router';
import { ControlService, FetchService, FractalService, TapService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, ToolbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private ts: TapService,
    private fs: FetchService,
    private cs: ControlService,
    private fls: FractalService,
  ) {}

  ngOnInit(): void {
    this.fs.fractal.get().subscribe(this.onInit);
  }

  onInit = (dto: FractalDto): void => {
    this.fls.dto.set(dto);
    this.addPages(dto);
  };

  addPages({ fractals }: FractalDto): void {
    for (const fractalName in fractals) {
      const controls = fractals[fractalName].controls;
      const { name, icon } = this.cs.parse(controls);
      this.ts.addPage({ name, icon, type: 'pages' });
    }
  }
}
