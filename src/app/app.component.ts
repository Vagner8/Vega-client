import { Component, OnInit } from '@angular/core';
import { SidenavComponent, ToolbarComponent } from '@components/molecules';
import { HeaderComponent } from '@components/atoms';
import { FetchService, FractalService } from '@services';
import { FractalDto, FractalsDto } from '@types';
import { FRACTALS } from '@constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private fs: FractalService,
    private fetch: FetchService,
  ) {}

  ngOnInit(): void {
    this.fetch.fractal.get().subscribe(this.onInit);
  }

  onInit = ({ fractals }: FractalDto): void => {
    this.setFractals(fractals);
  };

  private setFractals(fractals: FractalsDto) {
    Object.values(FRACTALS).forEach((name) => this.fs[name].set(fractals[name]));
  }
}
