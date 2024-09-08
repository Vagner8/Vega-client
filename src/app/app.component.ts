import { Component, OnInit } from '@angular/core';
import { SidenavComponent, ToolbarComponent } from '@components/molecules';
import { HeaderComponent } from '@components/atoms';
import { FetchService, FractalService } from '@services';
import { ArrayPipe, FractalPipe } from '@pipes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidenavComponent,
    ToolbarComponent,
    HeaderComponent,
    FractalPipe,
    ArrayPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    public fs: FractalService,
    private fetch: FetchService
  ) {}

  ngOnInit(): void {
    this.fetch.fractal.get().subscribe(fractal => this.fs.data.set(fractal));
  }
}
