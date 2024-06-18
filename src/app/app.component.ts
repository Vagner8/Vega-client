import { Component, OnInit } from '@angular/core';
import { DrawerComponent, HeaderComponent, ToolbarComponent } from '@components';
import { RouterOutlet } from '@angular/router';
import { MapService } from './services/map.service';
import { FetchService } from './services/fetch.service';
import { TapService } from './services/tap.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DrawerComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private ts: TapService,
    private ms: MapService,
    private fs: FetchService,
  ) {}

  ngOnInit(): void {
    this.fs.unit.get().subscribe((data) => {
      console.log('🚀 ~ data:', data);
      console.log('🚀 ~ this AppComponent:', this);
      console.log(this.ms.toUnit(data));
    });
  }
}
