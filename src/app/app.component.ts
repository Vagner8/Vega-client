import { Component, OnInit } from '@angular/core';
import { SidenavComponent, ToolbarComponent } from '@components/molecules';
import { HeaderComponent } from '@components/atoms';
import { RouterOutlet } from '@angular/router';
import { FetchService, FractalService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, ToolbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private fs: FetchService,
    private fls: FractalService,
  ) {}

  ngOnInit(): void {
    this.fs.fractal.get().subscribe(this.fls.run);
  }
}
