import { Component, OnInit } from '@angular/core';
import { DrawerComponent, HeaderComponent, ToolbarComponent } from '@components';
import { RouterOutlet } from '@angular/router';
import { FetchService, UnitService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawerComponent, ToolbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private us: UnitService,
    private fs: FetchService,
  ) {}

  ngOnInit(): void {
    this.fs.unit.get().subscribe(this.us.set);
  }
}
