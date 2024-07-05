import { Component, OnInit } from '@angular/core';
import { SidenavComponent, ToolbarComponent } from '@components/molecules';
import { HeaderComponent } from '@components/atoms';
import { RouterOutlet } from '@angular/router';
import { FetchService, UnitService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, ToolbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private us: UnitService,
    private fs: FetchService,
  ) {}

  ngOnInit(): void {
    this.fs.unit.get().subscribe(this.us.run);
  }
}
