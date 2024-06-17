import { Component, OnInit } from '@angular/core';
import { DrawerComponent, HeaderComponent, ToolbarComponent } from '@components';
import { RouterOutlet } from '@angular/router';
import { UnitHttpService, MapService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DrawerComponent, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private ms: MapService,
    private uhs: UnitHttpService,
  ) {}

  ngOnInit(): void {
    this.uhs.get('2b22ee97-76f6-48a3-a711-7f66c55e60a9').subscribe((data) => {
      console.log('🚀 ~ data:', data);
      console.log('🚀 ~ this AppComponent:', this);
      console.log(this.ms.toUnit(data));
    });
  }
}
